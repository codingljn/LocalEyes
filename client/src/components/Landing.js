import React from 'react';
import './Landing.css';

const Landing = props => (
  <div className="landing column y-center x-center">
      <div className="hero column y-center">
        <h1>Let's Explore The World!</h1>
        <button onClick={props.showForm}>Sign Up Now To Get Started!</button>
      </div>
      <div className="backGround"><img src="/images/world.jpg" alt="world" className="world" /></div>
  </div>
);

export default Landing;