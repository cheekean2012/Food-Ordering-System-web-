<template>
    <div class="card mt-3 mb-3">
        <h5 class="ps-3 pt-3" :id="type">{{ type }}</h5>
        <ul>
            <menu-item 
                v-for="(item, index) in menuItems" 
                :key="item.id"
                :id="item.id"
                :name="item.name"
                :type="item.type"
                :price="item.price"
                :image="item.image"
                :isLastItem="index === menuItems.length - 1">
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
    props: {
        type: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
    },    
    computed: {
        menuItems() {
            return this.items;
        },
        // ...mapState('menuType',['activeItemType']),
        ...mapState({
          activeItem: (state) => state.menuType.activeItemType, // Map the state to a local computed property
        }),
    },
    watch: {
        activeItem(newValue) {            
             // Check if the newValue matches the type of this MenuType
            if (newValue === this.type) {
                this.scrollToSection();
            }
        }
    },
    methods: {
        scrollToSection() {            
            const section = document.getElementById(this.type); 
            console.log(section);
            section.scrollIntoView({ behavior: 'smooth' }); 
        },
    },
};
</script>

<style scoped>
    ul {
        list-style: none;
        padding: 0;
    }
</style>