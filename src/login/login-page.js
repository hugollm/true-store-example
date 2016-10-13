import React from 'react';
import store from 'common/store';

import './styles.scss';

import { requestLogin } from './actions';


export default class LoginPage extends React.Component {

    constructor() {
        super();
        this.state = {username: 'johndoe', password: ''};
        this.update = this.forceUpdate.bind(this);
        this.focusPassword = this.focusPassword.bind(this);
    }

    componentDidMount() {
        store.listenData('login.error', this.update);
        store.listenData('login.loading', this.update);
        store.listenAction('loginError', this.focusPassword);
        this.refs.password.focus();
    }

    componentWillUnmount() {
        store.unlistenData('login.error', this.update);
        store.unlistenData('login.loading', this.update);
        store.unlistenAction('loginError', this.focusPassword);
    }

    render() {
        var { username, password } = this.state;
        var error = store.get('login.error');
        var spinner = store.get('login.loading') ? <i className="fa fa-spinner fa-spin"/> : null;
        return <div className="wrapper">
            <form className="form-signin" onSubmit={this.onSubmit.bind(this)}>
                <h2 className="form-signin-heading">True Store</h2>
                <input type="text" className="form-control" name="username" placeholder="Username"
                    value={username} onChange={this.bindValue.bind(this)}/>
                <input type="password" className="form-control" name="password" placeholder="Password" ref="password"
                    value={password} onChange={this.bindValue.bind(this)}/>
                <button className="btn btn-primary btn-block" type="submit">Login {spinner}</button>
                <div className="text-danger">{error}</div>
            </form>
            {this.renderCredentials()}
        </div>;
    }

    renderCredentials() {
        return <div style={{textAlign: 'center', marginTop: '10px'}}>
            username: johndoe <br/>
            password: 123456
        </div>;
    }

    bindValue(e) {
        var state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    focusPassword() {
        this.refs.password.focus();
        this.setState({password: ''});
    }

    onSubmit(e) {
        e.preventDefault();
        var { username, password } = this.state;
        requestLogin(username, password);
    }
}
