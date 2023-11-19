<template>
    <li>
        <div class="cart-item p-2">
            <div class="row g-0">
                <div class="col-8">
                    <div class="d-flex align-items-center">
                        <div class="ps-3">{{quantity}}x</div>
                        <div class="container">
                            <h6 class="ps-2 mb-0">{{ orderItemName }}</h6>
                            <span class="remark mb-0" :class="{ 'hide-text': remarks === ''}">{{ remarks }}</span>  
                            <span class="takeaway mb-0" :class="{ 'hide-text': takeaway === false}">{{ takeaway === true ? 'Takeaway' : '' }}</span>  
                        </div>              
                    </div>
                </div>               
                <div class="col-2 d-flex justify-content-center m-auto">{{ totalPrice.toFixed(2) }}</div>               
            </div>            
        </div>
    </li>
    <hr class="divider" v-if="!isLastItem"/>
</template>

<script>

    export default {
        props: {
            index: {
                type: Number,
                required: true,
            },
            id: {
                type: String,
                required: true,
            },
            orderItemName:{
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            totalPrice: {
                type: Number,
                required: true,
            },
            remarks: {
                type: String,
                required: false,
            },
            takeaway: {
                type: Boolean,
                required: false,
            },
            isLastItem: {
                type: Boolean,
                default: false,
            },
        },
    }
</script>

<style scoped>
    .cart-item {
        min-height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;

    }
 
    .takeaway, .remark {
        display: block;
        font-size: 0.75rem;
        padding-left: 0.5rem;
    }

    .hide-text {
        display: none;
    }
</style>