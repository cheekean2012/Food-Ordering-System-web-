export default {
    namespaced: true,
    state() {
      return {
        menuItems: [
          {
            id: 'T1',
            image:
              'https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697241600&semt=sph',
            name: 'Food 1', 
            type: 'Rice',
            unitPrice: 9.99,
            ingredients: 'apple, banana, cookies, donuts, egg, fish, grapes, honey, ice cream, juice, kiwi, lemon, mango, nuts, orange, pizza, quiche, rice, steak, tomato, ume, vanilla, watermelon, xigua, yogurt, zucchini',
            isAvailable: true
          },
          {
            id: 'T2',
            image:
              'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chan-walrus-958545.jpg&fm=jpg',
            name: 'Food 2',
            type: 'Rice',
            unitPrice: 29.99,
            ingredients: '',
            isAvailable: true
          },
          {
            id: 'T3',
            image:
              'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
            name: 'Food 3',
            type: 'Noodles',
            unitPrice: 6.99,
            ingredients: '',
            isAvailable: true
          },
          {
            id: 'T4',
            image:
              'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
            name: 'Food 4',
            type: 'Soup',
            unitPrice: 6.99,
            ingredients: '',
            isAvailable: true
          },
          {
            id: 'T5',
            image:
              'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
            name: 'Food 5',
            type: 'Soup',
            unitPrice: 6.99,
            ingredients: '',
            isAvailable: true
          },
          {
            id: 'T6',
            image:
              'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
            name: 'Food 6',
            type: 'Noodles',
            unitPrice: 6.99,
            ingredients: '',
            isAvailable: true
          },
          {
            id: 'T7',
            image:
              'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
            name: 'Food 7',
            type: 'Western Food',
            unitPrice: 6.99,
            ingredients: '',
            isAvailable: true
          },
          {
            id: 'T8',
            image:
              'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
            name: 'Food 8',
            type: 'Western Food',
            unitPrice: 6.99,
            ingredients: '',
            isAvailable: true
          }
        ],
        itemId: null
      };
    },
    mutations: {
      setToggleItemId(state, itemId) {
        state.itemId = itemId;
      }
    },
    getters: {
      menuItems(state) {
        return state.menuItems;
      }
    }
  };
  