<template>
    <li>
        <div class="cart-item p-2">
            <div class="row g-0">
                <div class="col-8">
                    <div class="d-flex align-items-center">
                        <div class="ps-3">{{quantity}}x</div>
                        <div class="container">
                            <h6 class="ps-2 mb-0">{{ cartItemName }}</h6>
                            <span class="remark mb-0" :class="{ 'hide-text': remarks === ''}">{{ remarks }}</span>  
                            <span class="takeaway mb-0" :class="{ 'hide-text': takeaway === false}">{{ takeaway === true ? 'Takeaway' : '' }}</span>  
                        </div>              
                    </div>
                </div>
                <router-link :to="editCartItem" @click="setCartItemIndex">
                    <div class="col-1 d-flex justify-content-center m-auto">
                        <button class="edit-btn">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    </div>
                </router-link>
                <div class="col-2 d-flex justify-content-center m-auto">{{ totalPrice.toFixed(2) }}</div>
                <div class="col-1 d-flex justify-content-center m-auto">
                    <button class="trash-btn" @click="removeCartItem">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>            
        </div>
    </li>
    <hr class="divider" v-if="!isLastItem"/>
</template>

<script>
import { mapMutations } from 'vuex';

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
            cartItemName:{
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
        computed: {
            editCartItem() {
                return { name: 'menuItemDetails'}
            },
        },
        watch: {
            
        },
        methods: {            
            ...mapMutations('cart', ['setToggleCartItemIndex']),
            setCartItemIndex() {
                console.log('get index: ' + this.index);
                this.setToggleCartItemIndex(this.index);               
            },    
            removeCartItem() {
                console.log('get index: ' + this.index);
                this.$store.dispatch('cart/removeFromCart', {
                    index: this.index,
                });      
                       
            },        
        }
    }
</script>

<style scoped>
    .cart-item {
        min-height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;

    }
    .edit-btn {
        background-color: transparent;
        border: none;
        color: #fff;
        font-size: 0.8rem;
        margin-bottom: auto;
    }
        a {
            display: contents
        }

    .trash-btn {
        background-color: transparent;
        border: none;
        color: #fff;
        font-size: 0.8rem;
        margin-bottom: auto;
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