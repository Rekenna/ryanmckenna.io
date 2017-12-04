import React, {Component} from 'react';

export default class PersonalProject extends Component {
    render() {
        const fields = this.props.fields;

        return (
            <div className="personal-project">
                <div className="row">
                    <div className="col-md-4 d-none d-md-block">
                        <div className="featured-image">
                            <img src={fields.featuredImage.fields.file.url} alt={fields.featuredImage.fields.description}/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-8">
                        <div className="content">
                            <h5>{fields.title}</h5>
                            <p className="technologies">{fields.technologiesUsed.join(', ')}</p>
                            <p className="snippet">{fields.snippet}</p>
                            <a href={fields.gitHub} target="_blank" rel="noreferrer" className="project-link"><i className="fa fa-github"></i> View Project</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}