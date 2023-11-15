import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore"; 

export default {
    namespaced: true,
    state() {
      return {
        menuItems: [],
        currentItemDetails: {},
        itemId: null
      };
    },
    mutations: {
      setMenuItems(state, menuItems) {
        state.menuItems = menuItems;
      },
      setToggleItemId(state, itemId) {
        state.itemId = itemId;
        console.log('itemId:', itemId);
      }
    },
    actions: {
      async fetchMenuItems({ commit }) {
        try {
          const querySnapshot = await getDocs(collection(db, 'menuItems'));
          const menuItems = querySnapshot.docs.map((doc) => doc.data());            
          console.log('Menu Types:', menuItems);
          commit('setMenuItems', menuItems);
        } catch (error) {
          console.error('Error fetching menu types:', error);
        }
      },
    },
    getters: {
      menuItems(state) {
        return state.menuItems;
      }
    }
  };
  