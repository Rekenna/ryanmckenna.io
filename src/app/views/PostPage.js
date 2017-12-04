import React, {Component} from 'react';
import {client} from "../../config/client";

var showdown  = require('showdown'),
    converter = new showdown.Converter()

export default class PostPage extends Component {
    constructor(){
        super();

        this.state = {
            meta: null,
            content: null
        }

    }

    _fetchPost(postID){
        const self = this;
        client.getEntry(postID)
            .then(function (entry) {
                self.setState({
                    meta: entry.sys,
                    content: entry.fields
                })
            })
    }

    componentDidMount(){
        this._fetchPost(this.props.match.params.id)
    }

    render() {

        const post = this.state.content

        if(post){
            return (
                <div className="post-page">
                    <main id="content" className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <article>
                                    <header>
                                        <h1>{post.title}</h1>
                                    </header>
                                    <div dangerouslySetInnerHTML={{__html: converter.makeHtml(post.content)}}></div>
                                </article>
                            </div>
                        </div>
                    </main>
                </div>
            );
        }else{
            return false
        }
    }
}