import React, {Component} from 'react';
import {Link} from 'react-router-dom';

var moment = require('moment');

export default class PostTease extends Component {
    render() {
        const fields = this.props.fields;

        return (
            <div className="post-tease col-md-3">
                <div className="content">
                    <div className="featured-image d-none d-md-block">
                        <img src={fields.featuredImage.fields.file.url} alt={fields.featuredImage.fields.description}/>
                    </div>
                    <div className="info">
                        <h5>{fields.title}</h5>
                        <p className="date">Published: {moment(fields.published).format("MMMM Do YYYY")}</p>
                        <p className="link-wrapper">
                            <Link className="post-link" to={`post/${this.props.id}`}>Read Post</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}