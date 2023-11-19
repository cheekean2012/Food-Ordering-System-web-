import { createStore } from 'vuex';

import menuModule from './modules/menu.js';
import menuTypeModule from './modules/menuType.js';
import cartModule from './modules/cart.js';
import qrOrderModule from './modules/qrOrder.js';

const store = createStore({
    modules: {
        menu: menuModule,
        menuType: menuTypeModule,
        cart: cartModule,
        qrOrder: qrOrderModule,
    },
    state() {
    }
});

export default store;
