import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore"; 

export default {
    namespaced: true,
    state() {
        return {
            menuTypes: [],
            activeItemType: 'RICE',            
        }
    },
    mutations: {
        setMenuTypes(state, menuTypes) {
            state.menuTypes = menuTypes;
          },
        setActiveItem(state, item) {
            state.activeItemType = item;
        },
    },
    actions: {
        async fetchMenuTypes({ commit }) {
          try {
            const querySnapshot = await getDocs(collection(db, 'menuTypes'));
            const menuTypes = querySnapshot.docs.map((doc) => doc.data().menuType);            
            commit('setMenuTypes', menuTypes);
          } catch (error) {
            console.error('Error fetching menu types:', error);
          }
        },
      },
    getters: {
        menuTypes(state) {
            return state.menuTypes;
        }
    }
}