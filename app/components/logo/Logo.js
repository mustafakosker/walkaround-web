import React from 'react';
import logo from '../../assets/svg/logo.svg';
import './logo.scss';

const Logo = () => (
  <div className="logo-container">
    <div className="logo" style={{ backgroundImage: `url(${logo})` }} />
    <div>
      <div className="text">WALK-@ROUND</div>
    </div>
  </div>
);

export default Logo;
