import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore"; 

export default {
    namespaced: true,
    state() {
      return {
        menuItems: [],
        currentItemDetails: {},
        itemId: null,
        searchInput: '',
      };
    },
    mutations: {
      setMenuItems(state, menuItems) {
        state.menuItems = menuItems;
      },
      setToggleItemId(state, itemId) {
        state.itemId = itemId;
      },   
      setSearchInput(state, value) {
        state.searchInput = value;
      },       
    },
    actions: {
      async fetchMenuItems({ commit }) {
        try {
          const querySnapshot = await getDocs(collection(db, 'menuItems'));
          const menuItems = querySnapshot.docs.map((doc) => doc.data());
          commit('setMenuItems', menuItems);
        } catch (error) {
          console.error('Error fetching menu types:', error);
        }
      },
    },
    getters: {
      menuItems(state) {
        return state.menuItems;
      },
      searchInput(state) {
        return state.searchInput;
      },
    }
  };
  