import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

var moment = require('moment');
var slugify = require('slugify');

export default class BlogPage extends Component {

    _getPreviews(posts){
        return posts.map((post) =>{
            return PostPreview(post)
        })
    }

    render() {

        let previews = this._getPreviews(this.props.posts)

        return (
            <div className="blog-page">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Blog - Ryan McKenna</title>
                    <link rel="canonical" href={`http://www.ryanmckenna.io/blog`} />
                </Helmet>
                <section className="blog-grid">
                    <div className="container">
                        <div className="row">
                            {previews}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

function PostPreview(post){
    const { sys, fields } = post;

    let tags = fields.tags.map((tag) =>{
        return <li key={tag}><a className={`topic ${slugify(tag, {lower: true})}`}><span>{tag}</span></a></li>
    })

    return(
        <div className="col-md-6" key={sys.id}>
            <Link to={`/blog/${fields.slug}`} className="image-link" style={{backgroundImage: `url('${fields.featuredImage.fields.file.url} '`}}/>
            <div className="info post">
                <div className="row">
                    <div className="col-md-6">
                        <ul className="topics">
                            {tags}
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h5><Link to={`/blog/${fields.slug}`}>{fields.title}</Link></h5>
                        <p className="published">{moment(fields.published).format('D MMMM YYYY')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

BlogPage.defaultProps = {
    posts: []
}