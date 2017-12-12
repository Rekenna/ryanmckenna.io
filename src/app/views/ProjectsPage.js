import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

export class ProjectsPage extends Component {
    render() {
        return (
            <div className="projects-page">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Projects - Ryan McKenna</title>
                    <link rel="canonical" href={`http://www.ryanmckenna.io/projects`} />
                </Helmet>
                <ProjectGrid projects={this.props.projects}/>
            </div>
        );
    }
}

ProjectsPage.defaultProps = {
    projects: []
}

export class ProjectGrid extends Component{

    _getPreviews(projects){
        return projects.map((project) =>{
            return ProjectPreview(project)
        })
    }

    render(){
        let previews = this._getPreviews(this.props.projects)
        return(
            <section className="projects-grid">
                <div className="container">
                    <div className="row">
                        {previews}
                    </div>
                </div>
            </section>
        );
    }
}

ProjectGrid.defaultProps = {
    projects: []
}


function ProjectPreview(project){
    const { sys, fields } = project;

    return(
        <div className="col-md-6" key={sys.id}>
            <Link to={`/projects/${fields.slug}`} className="project">
                <div className="image-link" style={{backgroundImage: `url('${fields.featuredImage.fields.file.url} '`}}>
                    <span className="snippet">{fields.snippet}</span>
                </div>
                <div className="info">
                    <h3>{fields.title}</h3>
                    <p className="tech">
                        {fields.madeWith.join(', ')}
                    </p>
                </div>
            </Link>
        </div>
    );
}