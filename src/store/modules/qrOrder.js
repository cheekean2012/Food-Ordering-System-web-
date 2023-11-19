export default {
    namespaced: true,
    state() {
        return {
            qrId : null,
            tableNumber: null,
            token: null,
            expTime: null,
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
        setExpTime(state, expTime) {
            state.expTime = expTime;
            localStorage.setItem('expTime', expTime);
        },
    },
    actions: {
        updateRouteInfo({ commit }, route) {
            var { tableNumber, token, expTime } = route.query;
      
            console.log('tableNumber:', tableNumber);
            console.log('token:', token);
            console.log('expTime:', expTime);

            if (tableNumber) {
              commit('setTableNumber', tableNumber);
            }
      
            if (token) {
              commit('setToken', token);
            }
      
            if (expTime) {
              commit('setExpTime', expTime);
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
        setExpTime(context, expTime) {
            context.commit('setExpTime', expTime);
        },
    },
    getters: {
        tableNumber(state) {
            return state.tableNumber;
        },
        token(state) {
            return state.token;
        },
        expTime(state) {
            return state.expTime;
        },
    }
}