import TrueStore from 'true-store';


var store = new TrueStore({
    login: {
        loading: false,
        user: null,
        error: null,
    },
    dashboard: {
        page: 'home',
    },
});

store.debug = true;

export default store;
