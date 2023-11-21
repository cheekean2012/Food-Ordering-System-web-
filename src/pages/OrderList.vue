<template>
    <base-container>
        <div class="d-flex card card-header jutsify-content-center align-items-center mb-2">
            <base-previous-button class="previous-btn" @click="backToPrevious" />
            <h5 class="card-title">ORDER LIST</h5>
        </div>
        <section v-if="orderItems === null">
            <div class="empty-container">
                <i class="fa-solid fa-circle-exclamation pb-4" style="font-size: 5rem;"></i>
                <h5 class="text-center pt-4">The order was empty. Please add the items into cart and place order.</h5>
            </div>
        </section>
        <section v-else>
            <div class="cart-container">
                <ul class="mb-0 pb-2 pt-2">
                    <order-item
                        v-for="(item, index) in orderItems"
                        :key="item.index"
                        :index="index"
                        :id="item.id"
                        :orderItemName="item.itemName"
                        :quantity="item.quantity"
                        :totalPrice="item.totalPrice"
                        :remarks="item.remarks"
                        :takeaway="item.takeaway"
                        :isLastItem="index === orderItems.length - 1">
                    </order-item>
                </ul>
            </div>
        </section>
    </base-container>
</template>

<script>
import BasePreviousButton from '@/components/UI/BasePreviousButton.vue';
import OrderItem from '../components/Items/order/OrderItem.vue';
import { db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore"; 

    export default {        
        components: {
            BasePreviousButton,
            OrderItem,
        },
        data() {
            return {
                orderItems: null,
            }
        },
        computed: {
            getOrderItems() {
                return this.$store.getters['cart/orderItems'];
            },
        },
        methods: {
            backToPrevious() {
                this.$router.go(-1);
            },
        },
        async mounted() {    
            const qrId = localStorage.getItem('qrId');
            if (qrId) {
                const orderItemRef = doc(db, 'tableOrders', qrId);
                const documentSnapshot = await getDoc(orderItemRef);

                if (documentSnapshot.exists()) {
                    const orderItemsOnCustomerOrdering = documentSnapshot.data().customerOrdering;
                    const orderItemsOnCustomerOrder = documentSnapshot.data().customerOrder;

                    if (orderItemsOnCustomerOrdering !== null) {
                        this.$store.dispatch('cart/setOrderItems', orderItemsOnCustomerOrdering);
                        this.orderItems = orderItemsOnCustomerOrdering;
                    } 
                    
                    if (orderItemsOnCustomerOrder !== null) {
                        if (orderItemsOnCustomerOrdering !== null) {
                            // Merge arrays using concat method
                            const mergedOrderItems = orderItemsOnCustomerOrdering.concat(orderItemsOnCustomerOrder);
                            this.$store.dispatch('cart/setOrderItems', mergedOrderItems);
                            this.orderItems = mergedOrderItems;
                        } else {
                            // If orderItemsOnCustomerOrdering is null, use orderItemsOnCustomerOrder directly
                            this.$store.dispatch('cart/setOrderItems', orderItemsOnCustomerOrder);
                            this.orderItems = orderItemsOnCustomerOrder;
                        }
                    }

                    return; // Exit the function early if orderItems are found
                }
            }
        }
    }
</script>

<style scoped>

    .card-header {
        border-radius: 0%;
        padding: 0;
        background-color: #fff;
        box-shadow: 0px 7px 10px -15px rgba(0,0,0,0.75);

    }
    .cart-container {
        overflow-y: scroll;
        margin-top: 2rem;
        border: 1px solid #dfdfdf;
        background-color: #fff;
        box-shadow: 0px 7px 10px -15px rgba(0,0,0,0.75);
    }

    .empty-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 560px;
        /* margin-top: 2rem; */
        margin-bottom: auto;
        background-color: #dfdfdf;
        box-shadow: 0px 7px 10px -15px rgba(0,0,0,0.75);
    }

    .cart-container::-webkit-scrollbar {
        width: 0px;
    }

    
    .previous-btn {
        margin: 0.8rem;
    }

    .card-title {
        margin: 1.1rem 0;
    }

    ul {
        list-style: none;
        padding: 0;
    }
</style>