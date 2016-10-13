import store from 'common/store';
import api from 'common/api';


export const changePage = store.action('changePage', (state, page) => {
    state.dashboard.page = page;
});
