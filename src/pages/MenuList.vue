<template>    
    <base-container>
         <show-modal v-if="showStatusModal" :show-modal="showStatusModal" />
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
import ShowModal from '../components/UI/BasePopUpDisabledModal.vue';
import { db } from "../firebase.js";
import { getDocs, where, query, collection } from "firebase/firestore"; 

export default {   
    components: {
        MenuType,
        ShowModal,
    },
    data() {
        return {
            showStatusModal: false,
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
        const savedId = localStorage.getItem('qrId');
        const savedToken = localStorage.getItem('token');
        const savedTableNumber = localStorage.getItem('tableNumber');

        localStorage.removeItem('ExpTime');
        
        if (savedId == 'undefined' && savedId == null) {
            localStorage.removeItem('qrId');
        }

        // Check if the key exists and its value is not 'undefined'
        if (savedToken == 'undefined' && savedToken == null) {
            localStorage.removeItem('token');
        }

        if (savedTableNumber == 'undefined' && savedTableNumber == null) {
            localStorage.removeItem('tableNumber');
        }

        // Check if redirectedFrom is defined before accessing its properties
        if (this.$route.redirectedFrom && this.$route.redirectedFrom.query.token != null) {
            var tokenFromUrl = this.$route.redirectedFrom.query.token;

            if (tokenFromUrl != null) {
                console.log('tokenFromUrl is not null');
                // Assuming your collection is named 'tableOrder'
                const tableOrderRef = collection(db, 'tableOrders');

                const querySnapshot = await getDocs(query(tableOrderRef, where('token', '==', tokenFromUrl)));

                    // Check if any documents match the query
                if (!querySnapshot.empty) {
                    // Loop through the documents to access their data and IDs
                    const documentSnapshot = querySnapshot.docs[0];           

                    const id = documentSnapshot.data().id;
                    const tableNumber = documentSnapshot.data().tableNumber;
                    const token = documentSnapshot.data().token;
                    const status = documentSnapshot.data().status;
                    console.log('status', status)

                    if (status === 'COMPLETED') {
                        // Set showStatusModal to true to display the modal
                        this.showStatusModal = true;
                    } else {
                        // Continue with the rest of your logic
                        this.$store.dispatch('qrOrder/setQrId', id);
                        this.$store.dispatch('qrOrder/setTableNumber', tableNumber);
                        this.$store.dispatch('qrOrder/setToken', token);

                        const customUrl = `/menu?tableNumber=${tableNumber}&token=${token}`;

                        // Use router.push to navigate to the custom URL
                        this.$router.push(customUrl);
                    }
                } else {
                    console.log('Document does not exist');
                }
            } else {
                console.log('tokenFromUrl is null');
            }
        } else if (savedId != null && savedToken != null && savedTableNumber != null) {
            // const customUrl = `/menu?tableNumber=${savedTableNumber}&token=${savedToken}`;

            // Assuming your collection is named 'tableOrder'
            const tableOrderRef = collection(db, 'tableOrders');

            const querySnapshot = await getDocs(query(tableOrderRef, where('token', '==', savedToken)));

            if (!querySnapshot.empty) {
                // Loop through the documents to access their data and IDs
                const documentSnapshot = querySnapshot.docs[0];           

                const id = documentSnapshot.data().id;
                const tableNumber = documentSnapshot.data().tableNumber;
                const token = documentSnapshot.data().token;
                const status = documentSnapshot.data().status;
                console.log('status', status)

                if (status === 'COMPLETED') {
                    // Set showStatusModal to true to display the modal
                    this.showStatusModal = true;
                } else {
                    // Continue with the rest of your logic
                    this.$store.dispatch('qrOrder/setQrId', id);
                    this.$store.dispatch('qrOrder/setTableNumber', tableNumber);
                    this.$store.dispatch('qrOrder/setToken', token);

                    const customUrl = `/menu?tableNumber=${tableNumber}&token=${token}`;

                    // Use router.push to navigate to the custom URL
                    this.$router.push(customUrl);
                }
            } else {
                console.log('Document does not exist');
            }
        } else {
            console.log('savedToken is null');
        }
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