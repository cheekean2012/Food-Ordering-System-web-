<template>
    <div>
        <!-- Navbar -->
        <nav class="navbar navbar-dark bg-dark">
            <a class="navbar-brand ms-4">Dashboard</a>
            <ul class="navbar-nav ml-auto me-4">        
                <li class="nav-item">
                    <a class="nav-link">Logout</a>
                </li>
                <!-- Add more navigation items as needed -->
            </ul>
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
                    <p class="card-text">1000</p>
                    </div>
                </div>
                </div>
                <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">Total Quantity</h5>
                    <p class="card-text">500</p>
                    </div>
                </div>
                </div>
                <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">Total Orders</h5>
                    <p class="card-text">50</p>
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

export default {
    components: {
        TheChart,
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    mounted() {
       
    },
};

</script>