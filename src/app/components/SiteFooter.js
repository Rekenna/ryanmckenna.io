import React from 'react';
import {Link} from 'react-router-dom';
import Socials from "./Socials";

const heart = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M414.9 24C361.8 24 312 65.7 288 89.3 264 65.7 214.2 24 161.1 24 70.3 24 16 76.9 16 165.5c0 72.6 66.8 133.3 69.2 135.4l187 180.8c8.8 8.5 22.8 8.5 31.6 0l186.7-180.2c2.7-2.7 69.5-63.5 69.5-136C560 76.9 505.7 24 414.9 24z"/></svg>)

export default function SiteFooter(props) {
    return (
        <div className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="cell">
                            <ul className="links">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/projects">Projects</Link></li>
                                <li><Link to="/blog">Blog</Link></li>
                                <li><Link to="/sitemap">Sitemap</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="cell">
                            <Socials format={`full`}/>
                        </div>
                    </div>
                    <div className="col-md-6 d-none d-md-block">
                        <div className="cell">
                            <h5>Subscribe to My Blog</h5>
                            <p>Recieve an email when I publish a new article. I’ll never send you garbage, I pinky promise!</p>
                            <div id="mc_embed_signup">
                                <form className="subscribe-form" action="https://wowpassport.us16.list-manage.com/subscribe/post?u=90382259fa096f3247de5fd52&amp;id=2462413c4a" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank">
                                    <div className="row">
                                        <div className="input-group col-md-10">
                                            <input type="email" name="EMAIL" className="email form-control" id="mce-EMAIL" placeholder="Email Address"/>
                                        </div>
                                        <div className="input-group col-md-2">
                                            <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" className="form-control" name="b_90382259fa096f3247de5fd52_2462413c4a" tabIndex="-1" value=""/></div>
                                        </div>
                                        <div className="input-group col-md-6">
                                            <input type="submit" value="Sign Up" name="subscribe" id="mc-embedded-subscribe" className="submit"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <p className="copyright">Made with <i className="heart">{heart}</i> by Ryan McKenna. Copyright &copy; 2017</p>
                    </div>
                </div>
            </div>
        </div>
    );
}