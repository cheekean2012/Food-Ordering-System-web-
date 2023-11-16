<template>
    <div class="card" :class="{isEmpty: isMenuEmpty}">
        <!-- <h5 class="ps-3 pt-3">{{ type }}</h5> -->
        <ul>
            <menu-item 
                v-for="(item, index) in filteredMenuItems" 
                :key="item.id" 
                :id="item.id"               
                :itemName="item.itemName"
                :type="item.type"
                :price="item.price"
                :image="item.image"
                :available="item.available"
                :isLastItem="index === filteredMenuItems.length - 1">
            </menu-item>
        </ul>
    </div>
</template>

<script>
import MenuItem from './MenuItem.vue';
import { mapState } from 'vuex';

export default {
    components: {
        MenuItem,
    },
    data() {
        return {
            isEmptyMenuItem: false,
            searchInput: '',
        };
    },    
    computed: {
        menuItems() {
            return this.$store.getters['menu/menuItems'];
        },        
        ...mapState({
          activeItem: (state) => state.menuType.activeItemType, // Map the state to a local computed property
          menuSearch: (state) => state.menu.searchInput, // Update this line to match your actual Vuex module structure
        }),
        filteredMenuItems() {            
            return this.menuItems.filter(
                (item) =>
                item.type === this.activeItem &&
                item.itemName.toLowerCase().includes(this.menuSearch.toLowerCase())
            );
        },
        isMenuEmpty() {
            return this.filteredMenuItems.length === 0;            
        },
    },
    methods: {
        async getMenuItems() {
            await this.$store.dispatch('menu/fetchMenuItems');
        },  
    },
    async mounted() {
        await this.getMenuItems();
    },
    created() {
        this.searchInput = this.menuSearchValue
    },

};
</script>

<style scoped>
    ul {
        list-style: none;
        padding: 0;
    }

    .isEmpty {
        display: none;
    }
</style>