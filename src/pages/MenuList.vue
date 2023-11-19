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
        <the-footer v-if="isTokenNotEmpty"></the-footer>
    </base-container>    
</template>

<script>
import MenuType from '../components/Menu/MenuType.vue';
// import { useRouter } from 'vue-router';
import { db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore"; 

export default {   
    components: {
        MenuType,
    },
    data() {
        return {
        }
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
        isTokenNotEmpty() {
            const token = this.$store.getters['qrOrder/token'];
            return token;
        }
    },
    async mounted() {
        const savedToken = localStorage.getItem('token');
        const savedTableNumber = localStorage.getItem('tableNumber');
        const savedExpTime = localStorage.getItem('expTime');
        
        // Check if the key exists and its value is not 'undefined'
        if (savedToken == 'undefined' && savedToken == null) {
            localStorage.removeItem('token');
        }

        if (savedTableNumber == 'undefined' && savedTableNumber == null) {
            localStorage.removeItem('tableNumber');
        }

        if (savedExpTime == 'undefined' && savedExpTime == null) {
            localStorage.removeItem('expTime');
        }

        console.log('Full route object:', this.$route);
        console.log('savedToken', savedToken + ', '+ typeof savedToken);
        console.log('savedTableNumber', savedTableNumber+ ', '+ typeof savedTableNumber);
        console.log('savedExpTime', savedExpTime+ ', '+ typeof savedExpTime);

        console.log('Full route object:', this.$route);
        // Check if redirectedFrom is defined before accessing its properties
        if (this.$route.redirectedFrom && this.$route.redirectedFrom.query.token != null) {
            var tokenFromUrl = this.$route.redirectedFrom.query.token;
            console.log('tokenFromUrl', tokenFromUrl);

            if (tokenFromUrl != null) {
                console.log('tokenFromUrl is not null');
                // Assuming your collection is named 'tableOrder'
                const tableOrderRef = doc(db, 'tableOrder', tokenFromUrl);
                console.log('tableOrderRef', tableOrderRef);

                // Retrieve the document data
                const documentSnapshot = await getDoc(tableOrderRef);
                console.log('documentSnapshot', documentSnapshot);

                if (documentSnapshot.exists()) {
                    // Document exists, you can access its data
                    const tableNumber = documentSnapshot.data().tableNumber;
                    const token = documentSnapshot.data().token;
                    const expTime = documentSnapshot.data().expTime;

                    console.log('Table Number:', tableNumber);
                    console.log('Token:', token);
                    console.log('Expiration Time:', expTime);

                    this.$store.dispatch('qrOrder/setTableNumber', tableNumber);
                    this.$store.dispatch('qrOrder/setToken', token);
                    this.$store.dispatch('qrOrder/setExpTime', expTime);

                    const customUrl = `/menu?tableNumber=${tableNumber}&token=${token}`;
                    console.log('customUrl in menu list on mounted if $route has data', customUrl);
                   
                     // Use router.push to navigate to the custom URL
                    this.$router.push(customUrl);
                } else {
                    console.log('Document does not exist');
                }
            } else {
                console.log('tokenFromUrl is null');
            }
        } else if ( savedToken != null && savedTableNumber != null && savedExpTime != null) {
            console.log('savedToken is not null');
            const customUrl = `/menu?tableNumber=${savedTableNumber}&token=${savedToken}`;
            console.log('customUrl in menu list on mounted', customUrl);

            this.$store.dispatch('qrOrder/setTableNumber', savedTableNumber);
            this.$store.dispatch('qrOrder/setToken', savedToken);
            this.$store.dispatch('qrOrder/setExpTime', savedExpTime);

            // Use router.push to navigate to the custom URL
            this.$router.push(customUrl);
        } else {
            console.log('savedToken is null');
        }

        

        // if (this.$route.query != null) {
        //     const token = this.$route.query.token;
        //     const tableNumber = this.$route.query.tableNumber;
        //     const expTime = this.$route.query.expTime; 

        //     const customUrl = `/menu?tableNumber=${tableNumber}&token=${token}&expTime=${expTime}`;
        //     console.log('customUrl in menu list on mounted if $route has data', customUrl);
        //     // Get the router instance
        //     const router = useRouter();

        //     // Use router.push to navigate to the custom URL
        //     router.push(customUrl);

        //     this.$store.dispatch('qrOrder/setTableNumber', tableNumber);
        //     this.$store.dispatch('qrOrder/setToken', token);
        //     this.$store.dispatch('qrOrder/setExpTime', expTime);
        // } else if (savedToken !== null || savedTableNumber !== null || savedExpTime !== null) {
        //     const customUrl = `/menu?tableNumber=${savedTableNumber}&token=${savedToken}&expTime=${savedExpTime}`;
        //     console.log('customUrl in menu list on mounted', customUrl);

        //     // Get the router instance
        //     const router = useRouter();

        //     // Use router.push to navigate to the custom URL
        //     router.push(customUrl);
        // }
    },
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