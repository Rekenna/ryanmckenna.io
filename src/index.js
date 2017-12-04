import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import './styles/app.css';

import SiteNavigation from "./app/includes/SiteNavigation";
import HomePage from "./app/views/HomePage";
import BlogPage from "./app/views/BlogPage";
import PostPage from "./app/views/PostPage";
import SiteFooter from "./app/includes/SiteFooter";

class App extends Component {
    render() {
        return (
            <Router>
                <div id="app" className="app">
                    <SiteNavigation/>
                    <div className="page-content">
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route path="/blog" component={BlogPage}/>
                            <Route path="/post/:id" component={PostPage}/>
                            <Redirect to="/"/>
                        </Switch>
                    </div>
                    <SiteFooter/>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
