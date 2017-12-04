import React, {Component} from 'react';

export default class SiteFooter extends Component {
    render() {
        return (
            <div className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <p className="copyright">Copyright 2017 &copy; <span>Ryan P McKenna</span></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}