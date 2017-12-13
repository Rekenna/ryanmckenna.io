import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";

var showdown  = require('showdown'),
    converter = new showdown.Converter()

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

    render() {

        const project = this.state.project

        let helmet,
            projectHeader,
            projectContent

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

ProjectsPost.propTypes = {
    projects: PropTypes.array.isRequired
}
