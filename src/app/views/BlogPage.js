import React, {Component} from 'react';
import {client} from "../../config/client";

import Banner from '../../assets/splash.jpg';

import PostTease from "../components/PostTease";
import FeaturedPost from "../components/FeaturedPost";

export default class BlogPage extends Component {
    constructor(){
        super();

        this.state = {
            posts: []
        }

        this._fetchPosts = this._fetchPosts.bind(this);
    }

    _fetchPosts(){
        const self = this;

        client.getEntries({
            'content_type': 'blogPost'
        }).then(function (entries) {
            self.setState({
                posts: entries.items
            })
        })
    }

    _getPosts(){
        return this.state.posts.map((post) => {
            return <PostTease key={post.sys.id} id={post.sys.id} fields={post.fields}/>
        });
    }

    componentDidMount(){
        this._fetchPosts()
    }

    render() {

        const posts = this._getPosts();

        return (
            <div className="blog-page">
                <div className="splash d-none d-md-block">
                    <img src={Banner} alt="Splash of Colorado Mountains"/>
                    <div className="content">
                        <FeaturedPost post={this.state.posts[0]}/>
                    </div>
                </div>
                <main id="content" className="container">
                    <div className="row">
                        {posts}
                    </div>
                </main>
            </div>
        );
    }
}