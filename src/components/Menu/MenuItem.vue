<template>    
    <li>                          
        <router-link :to="menuItemDetails" @click="setItemId" class="text-decoration-none">
            <div class="menu-item-data card mb-3 mt-3" >  
                <div class="row g-0">
                    <div class="col-2 menu-item-image">
                        <img :src="image" :alt="name">
                    </div>
                    <div class="col-8 ps-4 pe-3">
                        <h5 class="card-title menu-item-name">{{ id + '. ' + name }}</h5>
                    </div>
                    <div class="col-2">
                        <p class="card-text menu-item-price">RM{{ unitPrice }}</p>
                    </div>
                </div>
            </div>        
        </router-link>
    </li>
    <hr class="divider" v-if="!isLastItem"/>
</template>

<script>
import { mapMutations } from 'vuex';

    export default {
        props: {
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
            unitPrice: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            isLastItem: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            menuItemDetails () {
                return {name: 'menuItemDetails'}
            },
        },       
        methods: {
            ...mapMutations('menu', ['setToggleItemId']),
            setItemId() {
                this.setToggleItemId(this.id);               
            },
        },
    };    
</script>

<style scoped>

    .menu-item-data {
        padding: 0.5rem 1rem;
        border: none;
        cursor: pointer;
        display: flex;
    }

    .menu-item-data:last-child {
        margin-bottom: 0.5rem;
    }

    .menu-item-image img {
        height: 5rem;
        width: 5rem;
        object-fit: cover;
    }

    .divider {
        margin-top: 1rem;
        margin-bottom: 0px;
        border-top: 2px solid rgba(0, 0, 0, 0.5);
    }

</style>