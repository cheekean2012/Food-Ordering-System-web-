<template>
    <div>
        <h2 class="ps-1">{{ formattedDate }}</h2>
        <div class="d-flex flex-column">
            <div class="row mt-4">
                <div class="col mt-4">
                    <canvas id="myChart"></canvas>
                </div>
                <div class="col mt-4">
                    <canvas id="myChart2"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { db } from "../../firebase.js";
import { format } from 'date-fns';
import { Timestamp, getDocs, where, collection, query} from "firebase/firestore"; 


export default {
    data() {
        return {
        currentDate: new Date(),
        formattedDate: ''
        };
    },
    methods: {
        async fetchStatusFromFirestore() {
            // Fetch data from Firestore for payment status
            const currentDate = new Date();
            const startOfDayTimestamp = Timestamp.fromMillis(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0).getTime());
            const endOfDayTimestamp = Timestamp.fromMillis(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0, 0).getTime());
            console.log(startOfDayTimestamp, endOfDayTimestamp);

            // Fetch data from Firestore for payment status
            const q = query(
                collection(db, 'reports'),
                where('dateTime', '>=', startOfDayTimestamp),
                where('dateTime', '<=', endOfDayTimestamp)
            );

            const querySnapshot = await getDocs(q);
            console.log(querySnapshot.docs);
            const data = querySnapshot.docs.map(doc => doc.data().status);

            // You may need to process the data to get the count of COMPLETED and CANCELED
            const completedCount = data.filter(status => status === 'COMPLETED').length;
            const canceledCount = data.filter(status => status === 'CANCELED').length;

            return [completedCount, canceledCount];
        },
        async fetchTopSalesData() {
            const currentDate = new Date();
            const startOfDayTimestamp = Timestamp.fromMillis(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0).getTime());
            const endOfDayTimestamp = Timestamp.fromMillis(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0, 0).getTime());

            const q = query(
                collection(db, 'reports'),
                where('dateTime', '>=', startOfDayTimestamp),
                where('dateTime', '<=', endOfDayTimestamp),
                where('status', '==', 'COMPLETED')
            );

            const querySnapshot = await getDocs(q);
            // Use a Map to accumulate quantities for each item
            const itemQuantities = new Map();

            querySnapshot.forEach(doc => {
                const orderItems = doc.data().orderItem;

                orderItems.forEach(item => {
                    const itemName = item.itemName;
                    const quantity = item.quantity;

                    if (itemQuantities.has(itemName)) {
                        // If the item is already in the Map, update the quantity
                        itemQuantities.set(itemName, itemQuantities.get(itemName) + quantity);
                    } else {
                        // If the item is not in the Map, add it with the current quantity
                        itemQuantities.set(itemName, quantity);
                    }
                });
            });

            // Convert the Map to an array of objects
            const topSalesData = Array.from(itemQuantities, ([itemName, totalQuantity]) => ({ itemName, totalQuantity }));

            // Sort the array by totalQuantity in descending order
            topSalesData.sort((a, b) => b.totalQuantity - a.totalQuantity);

            // Take the top 5 items
            const top5Sales = topSalesData.slice(0, 5);

            return top5Sales;
        },
    },
  async mounted() {
    this.formattedDate = format(this.currentDate, 'dd/MM/yyyy');

    const ctx = document.getElementById('myChart');
    const [completedCount, canceledCount] = await this.fetchStatusFromFirestore();

    const dataPie = {
        labels: ['COMPLETED', 'CANCELED'],
        datasets: [{
            label: 'Sales',
            backgroundColor: ['rgba(0, 160, 0, 0.7)','rgba(255, 80, 80, 0.7)'],
            borderColor: ['rgba(0, 128, 0, 0.7)','rgba(255, 0, 0, 0.7)'],
            data: [completedCount,canceledCount],
            hoverOffset: 4
        }]
    }

    const configPie = {
        type: 'pie',
        data: dataPie,
        options: {
            aspectRatio: 1.5,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Payment Status'
                }
            }
        }
    };

    const ctx2 = document.getElementById('myChart2');
    const topSalesData = await this.fetchTopSalesData();
    console.log(topSalesData);

    const dataBar = {
        labels: topSalesData.map(item => item.itemName),
        datasets: [{
            label: 'Top Sales',
            backgroundColor: ['rgba(75, 192, 192, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(201, 203, 207, 0.5)'],
            borderColor: ['rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'],
            data: topSalesData.map(item => item.totalQuantity),
            borderWidth: 1
        }]
    }

    const configBar = {
        type: 'bar',
        data: dataBar,
        options: {
            aspectRatio: 1.5,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    new Chart(ctx, configPie);
    new Chart(ctx2, configBar);
  
  }
};
</script>

<style scoped></style>