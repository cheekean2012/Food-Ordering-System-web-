export default {
    namespaced: true,
    state() {
        return {
            cartItems: [],
            cartTotal: 0,
            cartQty: 0,
            cartItemIndex: null,
            orderItems: [],
        }
    },
    mutations: {
        addItemToCart(state, payload) {
            state.cartItems.push({
                id: payload.id,
                itemName: payload.itemName,
                unitPrice: payload.unitPrice,
                totalPrice: parseFloat(payload.totalPrice),
                quantity: payload.quantity,
                takeaway: payload.takeaway,
                remarks: payload.remarks
            });

            console.log("cartItems", state.cartItems);
            // Update the cart total and quantity
            state.cartQty += parseFloat(payload.quantity);
            state.cartTotal += parseFloat(payload.totalPrice);
        },
        updateToCartItem(state, payload) {
            const index = payload.index; // Get the index
            state.cartItems[index] = payload.item; // Update the item
            
            // Recalculate the cartTotal
            state.cartTotal = state.cartItems.reduce((total, item) => parseFloat(total) + parseFloat(item.totalPrice), 0);
            state.cartQty = state.cartItems.reduce((total, item) => parseFloat(total) + parseFloat(item.quantity), 0);
           
            console.log(state.cartItems[index].totalPrice);
        },   
        removeItemFromCart(state, payload) {
            const index = payload.index; // Get the index
        
            if (index !== -1) {
                const existingCartItem = state.cartItems[index];
                console.log(existingCartItem);
                state.cartItems.splice(index, 1);
                state.cartQty -= parseFloat(existingCartItem.quantity);
                
                if(existingCartItem.takeaway) {
                    state.cartTotal = state.cartTotal - parseFloat(existingCartItem.totalPrice);
                } else {
                    state.cartTotal = state.cartTotal - (parseFloat(existingCartItem.unitPrice) * parseFloat(existingCartItem.quantity));
                }

                if (state.cartTotal < 0) {
                    state.cartTotal = 0;
                }
            }
        },
        setToggleCartItemIndex(state, index) {
            state.cartItemIndex = index;
        },
        clearItemsFromCart(state) {
            console.log('check order items ', state.orderItems);
            state.cartItems = [];
            state.cartTotal = 0;
            state.cartQty = 0;
            console.log('check cart items ',state.cartItems);
        },
        setOrderItems(state, payload) {
            state.orderItems = payload;
            console.log('check order items ', state.orderItems);
        },
        addOrderItems(state, payload) {
            state.orderItems.push(...payload);
            console.log('check order items ', state.orderItems);
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
        clearCartItems(context) {
            context.commit('clearItemsFromCart');
        },
        addToOrderItems(context, payload) {
            context.commit('addOrderItems', payload);
        },
        setOrderItems(context, payload) {
            context.commit('setOrderItems', payload);
        }
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
        },
        orderItems(state) {
            return state.orderItems;
        }
    }
}