import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            name: "menu", // "home" is the name of the route
            path: "/menu",
            props: (route) => ({
              table: route.query.table,
              token: route.query.token,              
              expTime: route.query.expTime,
            }),
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
          name: "order",
          path: "/menu/orderList",
          component: () => import("./pages/OrderList.vue"),
        },
        {
          name: "dashboard",
          path: "/dashboard",
          component: () => import("./pages/DashboardPage.vue"),
        }
        // {
        //     path: '/:notFound(.*)',
        //     //component: () => import("./pages/NotFound.vue"),
        //     redirect: '/menu'
        // },
    ],
});

// Add a beforeEach navigation guard
router.beforeEach((to, from, next) => {
  // Check if the user is navigating to a route other than the "menu" page
    if (to.name !== 'menu') {
       if (to.name === 'menuItemDetails' && from.name === 'cart') {
          next();
        } else if (to.name === 'cart' && from.name === 'menuItemDetails') {
          next();
        } else if (to.name === 'dashboard') {
          next();
        } else if (from.name !== 'menu') {
          // Allow navigation to other pages
          next('/menu');
        } else {
          next();
        }
    } else {
      // Continue with the navigation
      next();
    }
});


export default router;
