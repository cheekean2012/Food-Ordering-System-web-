<template>    
    <base-container>
        <the-header></the-header>
        <section>
            <div>
                <ul class="pb-5">
                    <menu-type>
                    </menu-type>
                </ul>
            </div>
        </section>
        <the-footer></the-footer>
    </base-container>    
</template>

<script>
import MenuType from '../components/Menu/MenuType.vue';

export default {
    components: {
        MenuType,
    },
    computed: {
        menuItems() {
            return this.$store.getters['menu/menuItems'];
        },
        menuTypes() {
            return this.$store.getters['menuType/menuTypes'];
        },
        menuItemsByType() {
        // Group menu items by type
        const itemsByType = {};

        this.menuTypes.forEach(type => {
            itemsByType[type.type] = this.menuItems.filter(item => item.type === type.type);
        });

        return itemsByType;
        },
        filteredMenuTypes() {
            // Filter menu types to only include those with menu items
            return this.menuTypes.filter(menuType => this.menuItemsByType[menuType.type]?.length > 0);
        },
    }
};
</script>

<style scoped>
    /* section {
        padding: 20px;
    } */

    ul {
        list-style: none;
        padding: 0;
        text-decoration: none;
    }
</style>