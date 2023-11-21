<template>        
    <base-container>       
        <the-header></the-header>

        <div v-if="showStatusModal == true" class="modal visible">
            <div class="modal__content">
                <h1>Error</h1>

                <p>
                    The QR code was not able to proceed. Please reqeust a new QR code from the staff.
                </p>
            </div>
        </div>
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
                const tableOrderRef = doc(db, 'tableOrders', tokenFromUrl);

                // Retrieve the document data
                const documentSnapshot = await getDoc(tableOrderRef);

                if (documentSnapshot.exists()) {
                    // Document exists, you can access its data
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

            const tableOrderRef = doc(db, 'tableOrders', savedId);

                // Retrieve the document data
                const documentSnapshot = await getDoc(tableOrderRef);

                if (documentSnapshot.exists()) {
                    // Document exists, you can access its data
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

    .modal {
        visibility: hidden;
        opacity: 0;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(77, 77, 77, .7);
        transition: all .4s;
    }

    .visible {
        visibility: visible;
        opacity: 1;
    }

    .modal__content {
        border-radius: 4px;
        position: relative;
        width: 500px;
        max-width: 90%;
        background: #fff;
        padding: 1em 2em;
    }
</style>