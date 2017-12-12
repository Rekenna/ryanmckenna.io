import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'


import {client, gaCode} from "./config/client";

import { unregister } from './registerServiceWorker';

import './styles/app.css';

//Layout Imports
import SiteNavigation from "./app/components/SiteNavigation";
import SiteFooter from "./app/components/SiteFooter";

//Pages
import HomePage from "./app/views/HomePage";
import BlogPage from "./app/views/BlogPage";
import BlogPost from "./app/views/BlogPost";
import { ProjectsPage } from "./app/views/ProjectsPage";
import ProjectsPost from "./app/views/ProjectsPost";

// Analytics
var ReactGA = require('react-ga');
ReactGA.initialize(gaCode);

const AppRoute = ({ component: Component, posts, projects, ...rest }) => (
    <Route {...rest} render={props => (
        <Component posts={posts} projects={projects} {...props}/>
    )}/>
);

class App extends Component {
    render() {
        return (
            <Router>
                <div id="app" className="app">
                    <SiteNavigation/>
                    <Store/>
                    <SiteFooter/>
                </div>
            </Router>
        );
    }
}

class Store extends Component{
    state = {
        posts: [],
        projects: []
    }

    _getData(){
        client.getEntries().then((response) => {
            let posts = response.items.filter((entry) => {
                return entry.sys.contentType.sys.id === 'post'
            });
            let projects = response.items.filter((entry) => {
                return entry.sys.contentType.sys.id === 'project'
            });
            this.setState({
                posts: posts,
                projects: projects
            })
        }).catch(console.error)
    }

    componentDidMount(){
        this._getData()
    }
    render(){
        return(
            <div className="page-content">
                <div className="page-content">
                    <SwitchTracker>
                        <AppRoute exact path="/" component={HomePage} posts={this.state.posts} projects={this.state.projects}/>
                        <AppRoute path="/blog/:slug" component={BlogPost} posts={this.state.posts}/>
                        <AppRoute exact path="/blog" component={BlogPage} posts={this.state.posts}/>
                        <AppRoute path="/projects/:slug" component={ProjectsPost} projects={this.state.projects}/>
                        <AppRoute path="/projects" component={ProjectsPage} projects={this.state.projects}/>
                        <Redirect to="/"/>
                    </SwitchTracker>
                </div>
            </div>
        )
    }
}

class SwitchTracker extends Switch {
    componentDidMount(){
        if (process.env.NODE_ENV !== 'development') {
            ReactGA.set({ page: window.location.pathname + window.location.search });
            ReactGA.pageview(window.location.pathname + window.location.search);
        }
    }
    componentWillReceiveProps(){
        if (process.env.NODE_ENV !== 'development') {
            ReactGA.set({ page: window.location.pathname + window.location.search });
            ReactGA.pageview(window.location.pathname + window.location.search);
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
unregister();
