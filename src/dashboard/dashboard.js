import React from 'react';
import store from 'common/store';

import './styles.scss';

import HomePage from './home-page';
import AboutPage from './about-page';

import { logout } from 'login/actions';
import { changePage } from './actions';


export default class Dashboard extends React.Component {

    constructor() {
        super();
        this.update = this.forceUpdate.bind(this);
    }

    componentDidMount() {
        store.listenData('dashboard.page', this.update);
    }

    componentWillUnmount() {
        store.unlistenData('dashboard.page', this.update);
    }

    render() {
        return <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#" onClick={this.onClickHome.bind(this)}>
                            True Store
                        </a>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        {this.renderNavbarLinks()}
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="page">
                    {this.renderPage()}
                </div>
                <hr/>
                {store.get('login.user.email')}
            </div>
        </div>;
    }

    renderNavbarLinks() {
        var homeActive = store.get('dashboard.page') == 'home' ? 'active' : '';
        var aboutActive = store.get('dashboard.page') == 'about' ? 'active' : '';
        return <ul className="nav navbar-nav">
            <li className={homeActive}><a href="#" onClick={this.onClickHome.bind(this)}>Home</a></li>
            <li className={aboutActive}><a href="#" onClick={this.onClickAbout.bind(this)}>About</a></li>
            <li><a href="#" onClick={this.onClickLogout.bind(this)}>Logout</a></li>
        </ul>;
    }

    renderPage() {
        if (store.get('dashboard.page') == 'home')
            return <HomePage/>;
        if (store.get('dashboard.page') == 'about')
            return <AboutPage/>;
    }

    onClickHome() {
        changePage('home');
    }

    onClickAbout() {
        changePage('about');
    }

    onClickLogout() {
        logout();
    }
}
