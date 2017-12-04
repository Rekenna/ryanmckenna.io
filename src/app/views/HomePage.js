import React, {Component} from 'react';
import {client} from "../../config/client";

import Banner from '../../assets/splash.jpg';
// import Resume from '../../assets/ryanmckenna-resume2017.pdf';

import PersonalProject from "../components/PersonalProject"

export default class HomePage extends Component {
    constructor(){
        super();

        this.state = {
            projects: [],
            resumeLink: '//downloads.contentful.com/mw4l9lx40x7x/2nHNs0ldny0i2iquoYuGi4/44972ed843215b957f39cf7f04675c59/ryanmckenna-resume2017.pdf'
        }

        this._fetchProjects = this._fetchProjects.bind(this);
    }

    _fetchProjects(){
        const self = this;

        client.getEntries({
            'content_type': 'personalProject'
        }).then(function (entries) {
            self.setState({
                projects: entries.items
            })
        })
    }

    _getProjects(){
        return this.state.projects.map((project) => {
            return <PersonalProject key={project.sys.id} fields={project.fields}/>
        });
    }

    _setResumeLink(){
        const self = this;
        client.getAsset('2nHNs0ldny0i2iquoYuGi4')
            .then(function (asset) {
                self.setState({
                    resumeLink: asset.fields.file.url
                })
            })
    }

    componentDidMount(){
        this._fetchProjects()
        this._setResumeLink()
    }

    render() {

        const projects = this._getProjects();

        return (
            <div className="home-page">
                <div className="splash">
                    <img src={Banner} alt="Splash of Colorado Mountains"/>
                    <div className="content">
                        <h1><strong>Hello,</strong><span>My name is Ryan McKenna and I’m a
          frontend developer from Denver, CO.</span></h1>
                    </div>
                </div>
                <main id="content" className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <article className="summary">
                                <h4 className="projects-title">I Make Things</h4>
                                <p>I chose to learn how to code so that I could realize my own dreams and aspirations in a medium that I grew up on. Over time I realized that all I wanted to do was <strong>create</strong> new and amazing applications with <strong>great people</strong> and a <strong>little experimentation</strong>.</p>
                                <div className="d-none d-md-block">
                                    <div className="actions">
                                        <a href="mailto:ryanpatmckenna@gmail.com"><i className="fa fa-telegram"></i>Email</a>
                                        <a target="_blank" href={this.state.resumeLink}><i className="fa fa-download"></i>Resume</a>
                                    </div>
                                </div>
                                <ul className="links">
                                    <li><a href="https://codepen.io/rpmckenna/" rel="noopener noreferrer" target="_blank"><i className="fa fa-codepen"></i></a></li>
                                    <li><a href="https://github.com/Rekenna" rel="noopener noreferrer" target="_blank"><i className="fa fa-github"></i></a></li>
                                    <li><a href="https://twitter.com/ryanpmckenna" rel="noopener noreferrer" target="_blank"><i className="fa fa-twitter"></i></a></li>
                                </ul>
                            </article>
                        </div>
                        <div className="col-md-8">
                            {projects}
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}