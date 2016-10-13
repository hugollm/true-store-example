import store from 'common/store';
import api from 'common/api';


export const requestLogin = store.action('requestLogin', (state, username, password) => {
    state.login.loading = true;
    state.login.error = null;
    var request = api.request('POST', '/login', {username: username, password: password});
    request.then((response) => {
        if (response.data.ok)
            loginOk(response.data.token);
        else
            loginError(response.data.error);
    });
});

export const loginOk = store.action('loginOk', (state, token) => {
    requestCurrentUser(token);
});

export const loginError = store.action('loginError', (state, error) => {
    state.login.loading = false;
    state.login.error = error;
});

export const requestCurrentUser = store.action('requestCurrentUser', (state, token) => {
    var request = api.request('POST', '/get-current-user', {token: token});
    request.then((response) => receiveCurrentUser(response.data.user));
});

export const receiveCurrentUser = store.action('receiveCurrentUser', (state, user) => {
    console.log(state);
    console.log(user);
    state.login.loading = false;
    state.login.user = user;
});

export const logout = store.action('logout', (state, user) => {
    state.login.user = null;
});
