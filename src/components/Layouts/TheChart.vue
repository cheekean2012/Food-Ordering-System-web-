<template>
    <div>
        <h2>The Chart</h2>
        <div class="d-flex flex-column">
            <div class="row">
                <div class="col">
                    <canvas id="myChart"></canvas>
                </div>
                <div class="col">
                    <canvas id="myChart2"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  mounted() {
    const ctx = document.getElementById('myChart');

    const dataPie = {
        labels: ['COMPLETED', 'CANCELED'],
        datasets: [{
            label: 'Sales',
            backgroundColor: ['rgba(0, 160, 0, 0.7)','rgba(255, 80, 80, 0.7)'],
            borderColor: ['rgba(0, 128, 0, 0.7)','rgba(255, 0, 0, 0.7)'],
            data: [20,4],
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
                    text: 'Total Payment Status'
                }
            }
        }
    };

    const ctx2 = document.getElementById('myChart2');

    const dataBar = {
        labels: ['Unagi Don', 'Salmon Don', 'Ramen', 'Sushi'],
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
            data: [265, 59, 80, 81],
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