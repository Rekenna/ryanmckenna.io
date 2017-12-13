import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
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
    }

    componentWillReceiveProps(nextProps){
        this._setPost(nextProps);
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

    render() {

        const post = this.state.post

        let helmet,
            postHeader,
            postContent,
            relatedProject;

        if(post){
            let tags = post.fields.tags.map((tag) =>{
                return <li key={tag}><a className={`topic ${slugify(tag, {lower: true})}`}><span>{tag}</span></a></li>
            });
            helmet = (
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{post.fields.title} - Ryan McKenna</title>
                    <link rel="canonical" href={`http://www.ryanmckenna.io/blog/${post.fields.slug}`} />
                </Helmet>
            );
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
            if(post.fields.relatedProject){
                relatedProject = (
                    <div className="related-project">
                        <p className="title">Related Project</p>
                        <h5><Link to={`/projects/${slugify(post.fields.relatedProject.fields.title, {lower: true})}`}>{post.fields.relatedProject.fields.title}</Link></h5>
                        <p className="snippet">{post.fields.relatedProject.fields.snippet}</p>
                    </div>
                );
            };
        }

        return (
            <div className="blog-post">
                {helmet}
                <main id="content" className="container">
                    <div className="row">
                        <div className="col-md-6">
                                <header className="article-header" id="article-header">
                                    {postHeader}
                                </header>
                                <div className="related">
                                    {relatedProject}
                                </div>
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