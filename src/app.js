import React from 'react';

import store from 'common/store';
import Dashboard from 'dashboard/dashboard';
import Login from 'login/login-page';


export default class App extends React.Component {

    constructor() {
        super();
        this.update = this.forceUpdate.bind(this);
    }

    componentDidMount() {
        store.listenData('login.user', this.update);
    }

    componentWillUnmount() {
        store.unlistenData('login.user', this.update);
    }

    render() {
        var user = store.get('login.user');
        return user ? <Dashboard/> : <Login/>;
    }
}
