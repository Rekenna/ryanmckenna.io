import React from 'react';

import animatedDevices from '../../assets/animatedDevices.svg';

export default function Hero(props){
    return(
        <div className="hero">
            <div className="splash">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-none d-md-block">
                            <img src={animatedDevices} alt="animated devices svg"/>
                        </div>
                        <div className="col-md-6">
                            <div className="brief">
                                <h1>I Make Web Things</h1>
                                <p>I chose to learn how to code so that I could realize my own dreams and
                                    aspirations in a medium that I grew up on. Over time I realized that all I
                                    wanted to do was <span className="baby">create new</span> and <span
                                        className="creamsicle">amazing applications</span> with great people and
                                    a <span className="mint">little experimentation</span>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}