import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            name: "menu", // "home" is the name of the route
            path: "/menu",            
            component: () => import("./pages/MenuList.vue"),
        },
        {
            name: "menuItemDetails", // "menuItemDetails" is the name of the route
            path: "/menu/menuItemDetails",  
            component: () => import("./pages/MenuItemDetails.vue"),
        },
        {
            name: "cart", // "cart" is the name of the route
            path: "/cart",
            component: () => import("./pages/CartList.vue"),
        },
        {
            path: '/:notFound(.*)',
            //component: () => import("./pages/NotFound.vue"),
            redirect: '/menu'
        },
    ],
});

export default router;
