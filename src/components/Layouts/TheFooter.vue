<template>
    <div class="row footer">
        <div class="col-4 footer-left">
            <h6 class="mb-0 pt-1">Dine in</h6>
            <p>Table: {{ tableNumber }}</p>
        </div>
        <div class="col-8 footer-right justify-content-between" @click="viewCartList">
            <h6 class="pb-2 pt-2">
                View Cart: <span class="counter-border">{{ cartQty }}</span>
            </h6>
            <h5 class="pb-2 pt-2">RM{{ cartTotal }}</h5>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableNumber: 1,
            counterCart: 0,
        }
    },
    computed: {
        cartTotal() {
            return this.$store.getters['cart/cartTotal'];
        },
        cartQty() {
            return this.$store.getters['cart/cartQty'];
        },
    },
    methods: {
        viewCartList() {
            this.$router.push({ name: 'cart' });
        },
    },
}
</script>

<style scoped>
    .footer {
        bottom: 0;
        width: 480px;
        height: 50px;
        position: fixed;
        margin: 0 auto;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;                
    }
    .footer-left {
        background-color: #fff;      
        align-items: center;
        justify-content: center;  
    }

    .footer-right {
        background-color: #fb8332;
        align-items: center;        
        display: flex;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

        .footer-right:hover {
            background-color: #e67931;
        }

    .counter-border {
        border: 1px solid #fff;
        border-radius: 15%;
        padding: 0.2rem 0.5rem;
    }
</style>