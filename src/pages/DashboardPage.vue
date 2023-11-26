<template>
    <div>
        <!-- Navbar -->
        <nav class="navbar navbar-dark bg-dark">
            <a class="navbar-brand ms-4">Dashboard</a>           
        </nav>
    </div>

    <!-- Content -->
    <div class="container mt-4">
        <div class="d-flex flex-column">
            <!-- Small Cards -->
            <div class="row">
                <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">Total Sales</h5>
                    <p class="card-text">{{ formattedTotalSales  }}</p>
                    </div>
                </div>
                </div>
                <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">Total Quantity</h5>
                    <p class="card-text">{{ totalQuantity }}</p>
                    </div>
                </div>
                </div>
                <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">Total Orders</h5>
                    <p class="card-text">{{ totalOrders }}</p>
                    </div>
                </div>
                </div>
            </div>            
        </div>
        <the-chart></the-chart>
    </div>
</template>

<script>
import TheChart from '@/components/Layouts/TheChart.vue'
import { db } from "../firebase.js";
import { Timestamp, getDocs, where, collection, query} from "firebase/firestore"; 

export default {
    components: {
        TheChart,
    },
    data() {
        return {
            totalSales: 0,
            totalQuantity: 0,
            totalOrders: 0,
        }
    },
        computed: {
        formattedTotalSales() {
        return `RM${this.totalSales.toFixed(2)}`;
        },
    },
    async mounted() {

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
        const data = querySnapshot.docs.map((doc) => doc.data());

        // Calculate total sales, total quantity, and total orders
        this.totalSales = data.reduce((acc, curr) => acc + parseFloat(curr.totalPrice), 0);
        this.totalQuantity = data.reduce((acc, curr) => acc + parseInt(curr.totalQuantity), 0);
        this.totalOrders = data.length;
       
    },
};

</script>