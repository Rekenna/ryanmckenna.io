import React, {Component} from 'react';
import {Helmet} from "react-helmet";

import Hero from '../components/Hero';
import {ProjectGrid} from "./ProjectsPage";
import PostFeed from "../components/PostFeed";

export default class HomePage extends Component {

    render() {

        return (
            <div className="home-page">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Ryan McKenna's Portfolio</title>
                    <link rel="canonical" href="http://www.ryanmckenna.io/" />
                </Helmet>
                <Hero/>
                <ProjectGrid projects={this.props.projects}/>
                <PostFeed posts={this.props.posts}/>
            </div>
        );
    }
}
