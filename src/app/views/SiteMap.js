import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

export default class SiteMap extends Component {

    _createLinks(prefix, posts){
        return posts.map((post) => {
            return SitemapLink(prefix, post)
        });
    }

    render() {

        const {projects, posts} = this.props;


        let projectLinks = this._createLinks('projects', projects);
        let postLinks = this._createLinks('blog', posts);

        return (
            <div className="sitemap-page">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Sitemap - Ryan McKenna's Portfolio</title>
                    <link rel="canonical" href="http://www.ryanmckenna.io/" />
                </Helmet>
                <div className="sitemap-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Sitemap</h1>
                            </div>
                            <div className="col-md-4">
                                <h5>Pages</h5>
                                <ul className="links">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/projects">Projects</Link></li>
                                    <li><Link to="/blog">Blog</Link></li>
                                    <li><Link to="/sitemap">Sitemap</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h5>Projects</h5>
                                <ul className="links">
                                    {projectLinks}
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h5>Posts</h5>
                                <ul className="links">
                                    {postLinks}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function SitemapLink(prefix, post){
    const { sys, fields } = post;

    return(
        <li key={sys.id}>
            <Link to={`/${prefix}/${fields.slug}`}>{fields.title}</Link>
        </li>
    );
}
