export default {
    namespaced: true,
    state() {
        return {
            menuTypes: [
                {
                    id: 'T1',
                    type: 'Rice'
                },
                {
                    id: 'T2',
                    type: 'Noodles'
                },
                {
                    id: 'T3',
                    type: 'Western Food'
                },
                {
                    id: 'T4',
                    type: 'Soup'
                },
                {
                    id: 'T5',
                    type: 'Snacks'
                },
                {
                    id: 'T6',
                    type: 'Drinks'
                },
                {
                    id: 'T7',
                    type: 'Desserts'
                }
            ],
            activeItemType: 'Rice',            
        }
    },
    mutations: {
        setActiveItem(state, item) {
            state.activeItemType = item;
        },
    },
    getters: {
        menuTypes(state) {
            return state.menuTypes;
        }
    }
}