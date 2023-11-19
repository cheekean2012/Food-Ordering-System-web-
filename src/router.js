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
    // Redirect them back to the "menu" page only if they are not already on it
    if (from.name !== 'menu') {
      next('/menu');
    } else {
      // Allow navigation to other pages
      next();
    }
  } else {
    // Continue with the navigation
    next();
  }
});

export default router;
