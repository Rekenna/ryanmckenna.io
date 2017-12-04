import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class SiteNavigation extends Component {
    render() {
        return (
            <div className="site-navigation">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <Link to="/" className="brand">
                                Ryan McKenna
                            </Link>
                        </div>
                        <div className="col-md-9">
                            <nav className="main-nav">
                                <ul className="page-links">
                                    <li>
                                        <Link to="/">Work</Link>
                                    </li>
                                    <li>
                                        <Link to="/blog">Blog</Link>
                                    </li>
                                    <li>
                                        <a href="mailto:ryanpatmckenna@gmail.com">Contact</a>
                                    </li>
                                </ul>
                                <ul className="socials">
                                    <li><a href="https://codepen.io/rpmckenna/" rel="noopener noreferrer" target="_blank"><i
                                        className="fa fa-codepen"></i></a></li>
                                    <li><a href="https://github.com/Rekenna" rel="noopener noreferrer" target="_blank"><i
                                        className="fa fa-github"></i></a></li>
                                    <li><a href="https://twitter.com/ryanpmckenna" rel="noopener noreferrer" target="_blank"><i
                                        className="fa fa-twitter"></i></a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}