<template>
    <base-container>
        <div class="d-flex card card-header jutsify-content-center align-items-center mb-2">
            <base-previous-button class="previous-btn" @click="backToPrevious" />
            <h5 class="card-title">CART</h5>
        </div>
        <section v-if="cartItems.length === 0">
            <div class="empty-container">
                <i class="fa-solid fa-circle-exclamation pb-4" style="font-size: 5rem;"></i>
                <h5 class="text-center pt-4">The cart was empty. Please add the order before proceed place order</h5>
            </div>
        </section>
        <section v-else>
            <div class="cart-container">
                <ul class="mb-0 pb-2 pt-2">
                    <cart-item
                        v-for="(item, index) in cartItems"
                        :key="item.index"
                        :index="index"
                        :id="item.id"
                        :cartItemName="item.name"
                        :quantity="item.quantity"
                        :totalPrice="item.totalPrice"
                        :remarks="item.remarks"
                        :takeaway="item.takeaway"
                        :isLastItem="index === cartItems.length - 1">
                    </cart-item>
                </ul>
            </div>
        </section>
        <div class="container-fluid price-container mt-3">
            <!-- <div class="d-flex flex-column"> -->
                <div class="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>RM{{ subTotal }}</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span>Service Charge 10%</span>
                    <span>RM{{ serviceCharge }}</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span>Before Round up</span>
                    <span>RM{{ beforeRoundup }}</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span>Round up</span>
                    <span>RM{{ roundup }}</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span class="fs-5 fw-bold">Total</span>
                    <span class="fs-5 fw-bold">RM{{ total }}</span>
                </div>
            <!-- </div>            -->
        </div>
        <base-button-footer :disabled="cartItems.length === 0">PLACE ORDER</base-button-footer>
    </base-container>
</template>

<script>
import BasePreviousButton from '@/components/UI/BasePreviousButton.vue';
import CartItem from '../components/Cart/CartItem.vue';

    export default {
        components: {
            BasePreviousButton,
            CartItem,
        },
        data() {
            return {
                subTotal: null,
                serviceCharge: null,
                beforeRoundup: null,
                roundup: null,
                total: null,
            }
        },
        computed: {
            cartItems() {
                return this.$store.getters['cart/cartItems'];
            },
            cartTotal() {
                return this.$store.getters['cart/cartTotal'];
            },  
            cartQuantity() {
                return this.$store.getters['cart/cartQty'];
            },   
        },
        watch: {
            cartItems: {
                handler: 'calculatePrice',
                deep: true,
                immediate: true,                            
            },
        },
        methods: {
            backToPrevious() {
                this.$router.go(-1);
            },
            calculatePrice() {
                if (this.cartItems.length === 0) {
                    const defaultPrice = 0.00.toFixed(2);

                    this.subTotal = defaultPrice;
                    this.serviceCharge = defaultPrice;
                    this.beforeRoundup = defaultPrice;
                    this.roundup = defaultPrice;
                    this.total = defaultPrice;
                } else {
                    this.subTotal = parseFloat(this.cartTotal).toFixed(2);
                    this.serviceCharge = (this.subTotal * 0.1).toFixed(2);
                    this.beforeRoundup = (parseFloat(this.subTotal) + parseFloat(this.serviceCharge)).toFixed(2);
                    this.roundup = (Math.ceil(parseFloat(this.subTotal)).toFixed(2) - parseFloat(this.subTotal)).toFixed(2);                    
                    this.total = (parseFloat(this.subTotal) + parseFloat(this.serviceCharge) + parseFloat(this.roundup)).toFixed(2);
                }
            },
        },
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
        max-height: 560px;
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
        margin-top: 2rem;
        background-color: #dfdfdf;
        box-shadow: 0px 7px 10px -15px rgba(0,0,0,0.75);
    }

    .cart-container::-webkit-scrollbar {
        width: 0px;
    }

    .price-container {
        position: absolute;
        bottom: 8%;
        max-width: 480px;

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