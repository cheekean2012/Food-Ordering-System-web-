export default {
    namespaced: true,
    state() {
        return {
            qrId : null,
            tableNumber: null,
            token: null,
        }
    },
    mutations: {
        setQrId(state, id) {
            state.qrId = id;
            localStorage.setItem('qrId', id);
        },
        setTableNumber(state, tableNumber) {
            state.tableNumber = tableNumber;
            localStorage.setItem('tableNumber', tableNumber);
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
    },
    actions: {
        updateRouteInfo({ commit }, route) {
            var { tableNumber, token } = route.query;
      
            console.log('tableNumber:', tableNumber);
            console.log('token:', token);

            if (tableNumber) {
              commit('setTableNumber', tableNumber);
            }
      
            if (token) {
              commit('setToken', token);
            }
        },
        setQrId(context, id) {
            context.commit('setQrId', id);
        },
        setTableNumber( context, tableNumber) {
            context.commit('setTableNumber', tableNumber);
        },
        setToken(context, token) {
            context.commit('setToken', token);
        },
    },
    getters: {
        tableNumber(state) {
            return state.tableNumber;
        },
        token(state) {
            return state.token;
        },
    }
}