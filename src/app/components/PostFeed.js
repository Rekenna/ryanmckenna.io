import React, { Component } from 'react';
import {Link} from 'react-router-dom';

var moment = require('moment');
var slugify = require('slugify');
var showdown  = require('showdown'),
    converter = new showdown.Converter()

export default class PostFeed extends Component{

    _getPreviews(posts){
        let count = 0;
        return posts.map((post) => {
            count++;
            if(count <= 4){
                return PostPreview(post)
            }
            return false
        })
    }

    render(){

        let previews = this._getPreviews(this.props.posts)

        return(
            <section className="post-feed">
                <div className="container">
                    <div className="row">
                        {previews}
                    </div>
                </div>
            </section>
        );
    }
}

function PostPreview(post){
    const { sys, fields } = post;

    let tags = fields.tags.map((tag) =>{
        return <li key={tag}><a className={`topic ${slugify(tag, {lower: true})}`}><span>{tag}</span></a></li>
    })

    let raw = converter.makeHtml(post.fields.content)
    let preview = (raw.split('<p>')[1]).split('</p>')[0].slice(0, 120) + ' [...]'

    return(
        <div className="col-md-3" key={sys.id}>
            <div className="post">
                <ul className="topics">
                    {tags}
                </ul>
                <h5><Link to={`/blog/${fields.slug}`}>{fields.title}</Link></h5>
                <p className="published">{moment(fields.published).format('D MMMM YYYY')}</p>
                <p>{preview}</p>
                <p className="link"><Link to={`/blog/${fields.slug}`}>Read More</Link></p>
            </div>
        </div>
    );
}

PostFeed.defaultProps = {
    posts: []
}