import { createStore } from 'vuex';

import menuModule from './modules/menu.js';
import menuTypeModule from './modules/menuType.js';
import cartModule from './modules/cart.js';

const store = createStore({
    modules: {
        menu: menuModule,
        menuType: menuTypeModule,
        cart: cartModule
    },
    state() {
    }
});

export default store;
