<template>
    <base-container>
        <div class="card mb-3">
            <base-previous-button @click="backToPrevious"></base-previous-button>
            <img :src="item.image" class="card-img-top" :alt="item.name">
            <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text">Ingredients: {{ item.ingredients }}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <p class="card-text mb-0">Price: RM{{ item.unitPrice }}</p>
                    <div class="d-flex quantity-container">
                        <button class="btn quantity-btn" @click="removeQuantity">
                            <i class="fa-solid fa-minus fa-2xs p-2" style="color: #f59b00;"></i>
                        </button>
                        <h5 class="card-text m-auto ps-2 pe-2">{{ quantity }}</h5>                        
                        <button class="quantity-btn" @click="addQuantity">
                            <i class="fa-solid fa-plus fa-2xs p-2" style="color: #f59b00;"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">Takeaway</h5>
                <div class="d-flex justify-content-between align=items-center mt-3">
                    <div class="checkbox-container">
                        <input type="checkbox" class="custom-checkbox" name="checkbox-takeaway" id="checkbox-takeaway" v-model="isChecked">
                        <label for="checkbox-takeaway">Container Charge Fees</label>
                    </div>
                    <p class="card-text">RM{{ charegedFee }}</p>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="form-outline">
                <label for="form-label" class="textarea-title">Remarks</label>
                <textarea class="form-control" placeholder="Enter remark here" id="floatingTextarea2" style="height: 100px" v-model="enterRemarks"></textarea>
            </div>
        </div>
        <div class="d-flex pb-5">
            <h4 class="card-text m-2">Total Price: RM{{ totalPrice }}</h4>
        </div>
        <base-button-footer @click="addToCart">{{ cartButtonName }}</base-button-footer>
    </base-container>
</template>

<script>
// import { mapState } from 'vuex';
import BasePreviousButton from '@/components/UI/BasePreviousButton.vue';

    export default {
        components: {
            BasePreviousButton,
        },
        data() {
            return {
                item: {
                    id: '',
                    name: '',
                    type: '',
                    unitPrice: null,
                    image: '',
                    ingredients: '',
                    remarks: '',
                },
                enterRemarks: '',
                getMenuId: null,
                getCardItemIndex: null,
                quantity: 1,
                charegedFee: 2,
                isChecked: false,
                cartButtonName: 'ADD TO CART',
            }
        },
        methods: {
            addQuantity() {
                this.quantity++;                
            },
            removeQuantity() {
                if (this.quantity > 1) {
                    this.quantity--;
                }
            },
            addToCart() {
                if (this.cartButtonName === 'ADD TO CART') {
                    
                    this.$store.dispatch('cart/addToCart', {
                        id: this.item.id,
                        name: this.item.name,
                        unitPrice: this.item.unitPrice,
                        totalPrice: this.totalPrice,
                        quantity: this.quantity,
                        remarks: this.enterRemarks,
                        takeaway: this.isChecked,
                    });                        
                } else {
                    this.$store.dispatch('cart/updateCartItem', {
                        index: this.getCardItemIndex,
                        item: {
                            id: this.item.id, // Make sure to include the ID
                            name: this.item.name,
                            unitPrice: this.item.unitPrice,
                            totalPrice: this.totalPrice,
                            quantity: this.quantity,
                            remarks: this.enterRemarks,
                            takeaway: this.isChecked,
                        },
                    });
                }                            
                this.$router.go(-1);
                this.enterRemarks = '';
                this.isChecked = false;
            },
            backToPrevious() {
                this.$router.go(-1);
            },
        },
        computed: {
            menuItems() {
            return this.$store.getters['menu/menuItems'];
            }, 
            cartItems() {
                return this.$store.getters['cart/cartItems'];
            },
            toggleMenuItemId() {
                return this.$store.state.menu.itemId;
            },
            toggleCartItemIndex() {
                return this.$store.state.cart.cartItemIndex;
            },
            totalPrice() {
                if (this.isChecked) {
                    return (this.item.unitPrice + this.charegedFee) * this.quantity;
                } else {
                    return this.item.unitPrice * this.quantity;
                }                
            },
        },
        mounted() {
            this.getMenuId = this.toggleMenuItemId;
            this.item = this.menuItems.find(item => item.id === this.getMenuId); 
            console.log('get id from mounted: ' + this.getMenuId);

            // if (this.getCardItemIndex !== null) {
            //     this.cartButtonName = 'UPDATE CART';
            //     this.quantity = this.cartItems[this.getCardItemIndex].quantity;
            //     this.item.remarks = this.cartItems[this.getCardItemIndex].remarks;
            //     this.isChecked = this.cartItems[this.getCardItemIndex].takeaway;
            // } else {
            //     this.cartButtonName = 'ADD TO CART';
            //     this.quantity = 1;
            //     this.item.remarks = '';
            //     this.isChecked = false;
            // }
        },
        beforeRouteEnter: (to, from, next) => {            
            const previousPage = from.name;
            
            if (previousPage === 'cart') {
                next(vm => {
                    vm.getCardItemIndex = vm.toggleCartItemIndex;
                    console.log('get index from detail: ' + vm.cartItems[vm.getCardItemIndex].id);
                    vm.cartButtonName = 'SAVE CHANGES';

                    vm.item.name = vm.cartItems[vm.getCardItemIndex].name;
                    vm.item.unitPrice = vm.cartItems[vm.getCardItemIndex].unitPrice;
                    vm.quantity = vm.cartItems[vm.getCardItemIndex].quantity;
                    vm.item.remarks = vm.cartItems[vm.getCardItemIndex].remarks;
                    vm.isChecked = vm.cartItems[vm.getCardItemIndex].takeaway;
                });
            } else {
                next();
            }       
        }       
    }
</script>

<style scoped>
    .card-img-top {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }

    .quantity-btn {
        background-color: #fff;        
        border: 1px solid #f59b00;
        border-radius: 50%;        
        margin: 0 0.5rem;        
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding: 0!important;
    }

    .checkbox-container {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    /* Hide the default checkbox */
    .custom-checkbox {
        display: none;        
    }

    /* Create a custom-styled checkbox using a pseudo-element */
    .custom-checkbox + label::before {
        content: "";        
        display: inline-flex;
        width: 24px;
        height: 24px;
        border: 2px solid #f59b00; /* Border style for the circular checkbox */
        border-radius: 50%; /* Makes it a circle */
        margin-right: 0.5rem;
        cursor: pointer;
        padding: 0.25rem;
    }

    label {
        position: relative;
    }

    /* Style the small circle inside when checked */
    .custom-checkbox:checked + label::after {
        content: '';
        position: absolute;
        top: 7px;
        left: 7px;
        width: 10px;
        height: 10px;
        margin: auto;
        border-radius: 50%;
        background-color: #f59b00;
    }

    .textarea-title {
        margin: 0.8rem;
        font-weight: 500;
    }
    
    .footer {
        bottom: 0;
        width: 480px;
        height: 50px;
        position: fixed;
        margin: 0 auto;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;                
    }

    .cart-btn {
        width: 100%;
        color: #fff;
        background-color: #f59b00;
    }

    .cart-btn:hover, .cart-btn:active {
        background-color: #fb8332;
        box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
        color: #fff;
        transition: all 0.2s ease-in-out;
    }
</style>