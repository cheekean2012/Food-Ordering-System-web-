export default {
    namespaced: true,
    state() {
        return {
            cartItems: [],
            cartTotal: 0,
            cartQty: 0,
            cartItemIndex: null
        }
    },
    mutations: {
        addItemToCart(state, payload) {
            const existingCartItem = state.cartItems.find(
                item => item.id === payload.id
            );
             // Check if takeaway is true
            if (payload.takeaway) {
                console.log(payload.remarks);
                // If an existing item with takeaway is found, increase its quantity
                if (existingCartItem && existingCartItem.takeaway && payload.remarks === existingCartItem.remarks) {
                    existingCartItem.quantity += payload.quantity;
                    existingCartItem.totalPrice += payload.totalPrice;
                } else {
                    // If no existing item with takeaway is found, push a new item
                    state.cartItems.push({
                        id: payload.id,
                        name: payload.name,
                        unitPrice: payload.unitPrice,
                        totalPrice: payload.totalPrice,
                        quantity: payload.quantity,
                        takeaway: payload.takeaway,
                        remarks: payload.remarks
                    });
                }                
            } else {
                // If takeaway is not true
                if (payload.remarks) {
                    // If remarks are not empty, push a new item with remarks
                    state.cartItems.push({
                        id: payload.id,
                        name: payload.name,
                        unitPrice: payload.unitPrice,
                        totalPrice: payload.totalPrice,
                        quantity: payload.quantity,
                        takeaway: payload.takeaway,
                        remarks: payload.remarks
                    });
                } else if (existingCartItem) {
                    // If no remarks and an existing item is found, increase its quantity
                    existingCartItem.quantity += payload.quantity;
                    existingCartItem.totalPrice += payload.unitPrice;
                } else {
                    // If no remarks and no existing item is found, push a new item
                    state.cartItems.push({
                        id: payload.id,
                        name: payload.name,
                        unitPrice: payload.unitPrice,
                        totalPrice: payload.totalPrice,
                        quantity: payload.quantity,
                        takeaway: payload.takeaway,
                        remarks: payload.remarks
                    });
                }
            }

            console.log("cartItems", state.cartItems);
            // Update the cart total and quantity
            state.cartQty += payload.quantity;            
            state.cartTotal += parseFloat(payload.totalPrice);
        },
        updateToCartItem(state, payload) {
            const index = payload.index; // Get the index
            state.cartItems[index] = payload.item; // Update the item
            
            // Recalculate the cartTotal
            state.cartTotal = state.cartItems.reduce((total, item) => total + parseFloat(item.totalPrice), 0);
            state.cartQty = state.cartItems.reduce((total, item) => total + item.quantity, 0);
           
            console.log(state.cartItems[index].totalPrice);
        },   
        removeItemFromCart(state, payload) {
            const index = payload.index; // Get the index
        
            if (index !== -1) {
                const existingCartItem = state.cartItems[index];
                console.log(existingCartItem);
                state.cartItems.splice(index, 1);
                state.cartQty -= existingCartItem.quantity;
                
                if(existingCartItem.takeaway) {
                    state.cartTotal = state.cartTotal - (parseFloat(existingCartItem.unitPrice) * existingCartItem.quantity + 2);
                } else {
                    state.cartTotal = state.cartTotal - (parseFloat(existingCartItem.unitPrice) * existingCartItem.quantity);
                }

                if (state.cartTotal < 0) {
                    state.cartTotal = 0;
                }
            }
        },
        setToggleCartItemIndex(state, index) {
            state.cartItemIndex = index;
        }
    },
    actions: {
        addToCart(context, payload) {
            context.commit('addItemToCart', payload);
        },
        updateCartItem(context, payload) {
            context.commit('updateToCartItem', payload);
        },
        removeFromCart(context, payload) {
            context.commit('removeItemFromCart', payload);
        },
    },
    getters: {
        cartItems(state) {
            return state.cartItems;
        },
        cartTotal(state) {
            return state.cartTotal.toFixed(2);
        },
        cartQty(state) {
            return state.cartQty;
        }
    }
}