<template>
    <div class="card mt-3 mb-3" :class="{isEmpty: isMenuEmpty}">
        <!-- <h5 class="ps-3 pt-3">{{ type }}</h5> -->
        <ul>
            <menu-item 
                v-for="(item, index) in  filteredMenuItems" 
                :key="item.id"
                :id="item.id"
                :name="item.name"
                :type="item.type"
                :unitPrice="item.unitPrice"
                :image="item.image"
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
        };
    },    
    computed: {
        menuItems() {
            return this.$store.getters['menu/menuItems'];
        },        
        ...mapState({
          activeItem: (state) => state.menuType.activeItemType, // Map the state to a local computed property          
        }),
        filteredMenuItems() {            
            return this.menuItems.filter((item) => item.type === this.activeItem);
        },
        isMenuEmpty() {
            return this.filteredMenuItems.length === 0;            
        }
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