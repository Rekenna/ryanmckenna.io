import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import Socials from '../components/Socials'

function SiteNavigation(props) {
    let currentPage = isCurrent(props.location.pathname)
    return (
        <div className={`site-navigation ${props.loaded} ${props.loaded === false ? 'loading' : 'loaded'}`}>
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
                                    <Link to="/projects" className={currentPage === 'projects' ? 'active' : 'inactive'}>Projects</Link>
                                </li>
                                <li>
                                    <Link to="/blog" className={currentPage === 'blog' ? 'active' : 'inactive'}>Blog</Link>
                                </li>
                                <li>
                                    <a href="mailto:ryanpatmckenna@gmail.com">Contact</a>
                                </li>
                            </ul>
                            <Socials format={'icons'}/>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

function isCurrent(pathName){
    let currentPage;
    if(pathName.includes('blog')){
        currentPage = 'blog'
    }
    else if(pathName.includes('projects')){
        currentPage = 'projects'
    }
    else{
        currentPage = ''
    }
    return currentPage
}

export default withRouter(SiteNavigation)