import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';

var showdown  = require('showdown'),
    converter = new showdown.Converter()

var slugify = require('slugify');
var moment = require('moment');

export default class ProjectsPost extends Component {

    state = {
        project: null
    }

    componentDidMount(){
        this._setPost(this.props);
    }

    componentWillReceiveProps(nextProps){
        this._setPost(nextProps);
    }

    _setPost(props){
        const urlSlug = props.match.params.slug
        let filtered = props.projects.filter((project) => {
            return project.fields.slug === urlSlug
        });

        this.setState({
            project: filtered[0]
        })
    }

    _getRelatedPosts(props){
        const urlSlug = props.match.params.slug

        let filtered = props.posts.filter((post) => {
            if(post.fields.relatedProject){
                return slugify(post.fields.relatedProject.fields.title, {lower: true}) === urlSlug
            }else{
                return false;
            }
        });

        return filtered.map((post) =>{
            return RelatedPost(post)
        })
    }

    render() {

        const project = this.state.project

        let helmet,
            projectHeader,
            projectContent,
            relatedPosts;

        if(project){
            projectHeader = (
                <div>
                    <h1>{project.fields.title}</h1>
                    <p className="snippet">{project.fields.snippet}</p>
                    <p className="tech">
                        {project.fields.madeWith.join(', ')}
                    </p>
                    <p className="links">
                        <a href={project.fields.projectLink} target="_blank" rel="noopener noreferrer">Website</a> / <a href={project.fields.gitHubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
                    </p>
                </div>
            );
            projectContent = (
                <div>
                    <img className="featured-image" src={project.fields.featuredImage.fields.file.url} alt={project.fields.featuredImage.fields.file.title}/>
                    <article className="article-content" dangerouslySetInnerHTML={{__html: converter.makeHtml(project.fields.content)}}/>
                </div>
            );
            helmet = (
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{project.fields.title} - Ryan McKenna</title>
                    <link rel="canonical" href={`http://www.ryanmckenna.io/projects/${project.fields.slug}`} />
                </Helmet>
            )
            relatedPosts = this._getRelatedPosts(this.props);
        }

        return (
            <div className="projects-post">
                {helmet}
                <main id="content" className="container">
                    <div className="row">
                        <div className="col-lg-6">
                                <header className="article-header" id="article-header">
                                    {projectHeader}
                                </header>
                            <div className="related-posts">
                                <p className="title">Related Posts</p>
                                {relatedPosts}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            {projectContent}
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

function RelatedPost(post){
    const { sys, fields } = post;

    let tags = fields.tags.map((tag) =>{
        return <li key={tag}><a className={`topic ${slugify(tag, {lower: true})}`}><span>{tag}</span></a></li>
    })

    return(
        <div className="related-post" key={sys.id}>
            <Link to={`/blog/${fields.slug}`} className="image-link" style={{backgroundImage: `url('${fields.featuredImage.fields.file.url} '`}}/>
            <div className="info post">
                <div className="row">
                    <div className="col-md-12">
                        <ul className="topics">
                            {tags}
                        </ul>
                        <h5><Link to={`/blog/${fields.slug}`}>{fields.title}</Link></h5>
                        <p className="published">{moment(fields.published).format('D MMMM YYYY')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

ProjectsPost.propTypes = {
    projects: PropTypes.array.isRequired
}
