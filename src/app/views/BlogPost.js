import React, {Component} from 'react';
import PropTypes from "prop-types";
import Waypoint from 'react-waypoint';
import {Helmet} from "react-helmet";

var moment = require('moment');
var slugify = require('slugify');
var showdown  = require('showdown'),
    converter = new showdown.Converter()

export default class BlogPost extends Component {

    state = {
        post: null
    }

    componentDidMount(){
        this._setPost(this.props);
        this._fixHeader()
    }

    componentWillReceiveProps(nextProps){
        this._setPost(nextProps);
        this._fixHeader()
    }

    _setPost(props){
        const urlSlug = props.match.params.slug
        let filtered = props.posts.filter((post) => {
            return post.fields.slug === urlSlug
        });

        this.setState({
            post: filtered[0]
        })
    }

    _fixHeader(){
        let articleHeader = document.getElementById("article-header")
        if(articleHeader){
            articleHeader.setAttribute("style", `width:${articleHeader.offsetWidth}px;top:${articleHeader.getBoundingClientRect().top}px;left:${articleHeader.getBoundingClientRect().left}px;`);
            articleHeader.className = 'article-header fixed';
        }
    }

    render() {

        const post = this.state.post

        let helmet,
            postHeader,
            postContent

        if(post){
            let tags = post.fields.tags.map((tag) =>{
                return <li key={tag}><a className={`topic ${slugify(tag, {lower: true})}`}><span>{tag}</span></a></li>
            })
            postHeader = (
                <div>
                    <h1>{post.fields.title}</h1>
                    <p className="published">Published {moment(post.fields.published).format('D MMMM YYYY')}</p>
                    <ul className="topics">
                        {tags}
                    </ul>
                </div>
            );
            postContent = (
                <div>
                    <img className="featured-image" src={post.fields.featuredImage.fields.file.url} alt={post.fields.featuredImage.fields.file.title}/>
                    <article className="article-content" dangerouslySetInnerHTML={{__html: converter.makeHtml(post.fields.content)}}/>
                </div>
            );
            helmet = (
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{post.fields.title} - Ryan McKenna</title>
                    <link rel="canonical" href={`http://www.ryanmckenna.io/blog/${post.fields.slug}`} />
                </Helmet>
            )
        }

        return (
            <div className="blog-post">
                {helmet}
                <main id="content" className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Waypoint>
                                <header className="article-header" id="article-header">
                                    {postHeader}
                                </header>
                            </Waypoint>
                        </div>
                        <div className="col-md-6">
                            {postContent}
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

BlogPost.propTypes = {
    posts: PropTypes.array.isRequired
}