import React, {Component} from 'react';
import {Link} from 'react-router-dom';

var moment = require('moment');

export default class FeaturedPost extends Component {
    render() {
        const post = this.props.post;

        if(post){
            let fields = post.fields
            let id = post.sys.id
            return (
                <div className="featured-post">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Most Recent Post</h2>
                            <div className="featured-content">
                                <h5><Link to={`post/${id}`}>{fields.title}</Link></h5>
                                <p className="date">Published: {moment(fields.published).format("MMMM Do YYYY")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else{
            return false
        }
    }
}