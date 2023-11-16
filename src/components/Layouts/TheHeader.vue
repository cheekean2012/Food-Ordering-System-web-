<template>
    <nav>
        <div class="d-flex align-items-center">
            <div class="input-group m-2 ms-3 me-3 flex-grow-1">
            <input
                type="search"
                class="form-control rounded"
                placeholder="Search Food Item"
                v-model="searchInput"
                @input="search"
            />          
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
// import { db } from "../../firebase";
// import { collection, getDocs } from "firebase/firestore"; 

export default {    
    data() {
        return {
            searchInput: "",
            menuItemTypes: [],
            activeItem: '',
            filteredMenuItems: [],
        };
    },
    computed: {
        ...mapState('menuType', ['activeItemType']),
        setActiveItemType() {
            return this.$store.state.menuType.activeItemType;
        },
        menuItems() {
            return this.$store.getters['menu/menuItems'];
        }, 
    },
    methods: {
        // search() {
        //     this.filteredMenuItems = this.menuItems.filter((menuItem) => {
        //         return menuItem.itemName.toLowerCase().includes(this.searchInput.toLowerCase());
        //     });
        //     console.log(this.filteredMenuItems);
        // },
        ...mapMutations('menuType', ['setActiveItem']),
            menuTypeClick(itemType) {
                this.activeItem = itemType; // Update activeItem in this component
                this.setActiveItem(itemType); // Update activeItem in Vuex store               
        },
        ...mapMutations('menu', ['setSearchInput']),
        search() {
            console.log("search input on header.vue ",this.searchInput);
            this.setSearchInput(this.searchInput); // Update searchInput in Vuex store
        },
        async getMenuTypes() {
            await this.$store.dispatch('menuType/fetchMenuTypes');
        },
    },
    async mounted() {
        this.activeItem = this.setActiveItemType; // Set activeItem in this component to the value in Vuex store
        console.log(this.activeItem);
         
        await this.getMenuTypes();

        this.menuItemTypes = this.$store.state.menuType.menuTypes;
         // Load all menu items initially
        this.filteredMenuItems = this.$store.getters['menu/menuItems'];
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

