<template>
    <nav>
        <div class="d-flex align-items-center">
            <div class="input-group m-2 ms-auto">
            <input
                type="search"
                class="form-control rounded"
                placeholder="Search Food Item"
            />
            <span class="input-group-text border-0" id="search-addon" @click="search">
                <i class="fas fa-search"></i>
            </span>
            </div>
            <i class="fa-solid fa-receipt fa-lg me-3 review-order" style="color: black;"></i> 
        </div>
        <div class="menu-item-types-container">
            <div class="menu-item-type" :class="{ active: itemType === activeItem }" 
                v-for="itemType in menuItemTypes" 
                :key="itemType"
                @click="menuTypeClick(itemType)">                
                {{ itemType }}
            </div>
        </div>
    </nav>
    <div class="container">
        <div class="test"></div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {    
    data() {
        return {
            searchInput: "",
            menuItemTypes: ["Rice", "Noodles", "Western Food", "Soup", "Drinks", "Desserts"],
            activeItem: '',
        };
    },
    computed: {
        ...mapState('menuType', ['activeItemType']),
        setActiveItemType() {
            return this.$store.state.menuType.activeItemType;
        },
    },
    methods: {
        search() {
            console.log("searching");
        },
        ...mapMutations('menuType', ['setActiveItem']),
            menuTypeClick(itemType) {
                this.activeItem = itemType; // Update activeItem in this component
                this.setActiveItem(itemType); // Update activeItem in Vuex store               
        },
    },
    mounted() {
        this.activeItem = this.setActiveItemType; // Set activeItem in this component to the value in Vuex store
        console.log(this.activeItem);
    },
};
</script>

<style scoped>
    nav {
        background: rgba(233, 171, 58, 1);
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        position: sticky;
        top: 0;        
        z-index: 1;        
    }

    .nav-dir {
        text-decoration: none;
        color: #000;
    }

    a.nav-dir:active {
        color: #fff;
    }

    .input-group {
        width: 50% !important;
    }

    .input-group span.input-group-text {
        background: transparent;
        border: none;
        cursor: pointer;
    }

    .review-order {
        cursor: pointer;
    }    

    .menu-item-types-container {
        display: flex;
        overflow-x: auto;
        white-space: nowrap;
        padding: 10px;
    }

    .menu-item-types-container::-webkit-scrollbar {
        height: 5px;
        width: 5px;
        margin-bottom: 200px;
    }

    .menu-item-type {
        display: inline-block;        
        margin-right: 10px;
        padding: 5px 10px;
        background-color: #fff;
        border-radius: 20px;
        cursor: pointer;
    }    

    .menu-item-type:hover, .menu-item-type.active {
        background-color: #fb8332;
        box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
        color: #fff;
        transition: all 0.2s ease-in-out;
    }

    .menu-item-type:hover {
        transform: translateY(-2px);
    }

</style>

