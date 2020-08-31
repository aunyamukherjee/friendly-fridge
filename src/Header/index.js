import React from 'react';
import './Header.css';

const Header = (props) => {
    return (
      <header className="Header-container">
        {props.children}
        
      </header>
    )
  }

export default Header