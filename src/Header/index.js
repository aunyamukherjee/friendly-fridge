import React, {Component} from 'react';
import { Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import './Header.css';
// import PageName from '../PageName';


const style = {
  backgroundColor: 'white',
  font: 'inherit',
  border: '1px solid blue',
  padding: '8px',
  cursor: 'pointer',
  justifyContent: 'center',
  margin: '8px'
};


const Header = (props) => {
    return (
      <header className="Header-container">
        {props.children}
        
        <div className= "Logo">
          <p>FriendlyFridge</p>      
        </div>
        <div className= "Header-button">
          <Router>
            <button
              style = {style}>
                <Link to="/food/new">
                  Add
                </Link>
            </button>
            <button
              style = {style}>
                <Link to="/authenticate/login">
                  Login
                </Link>
            </button>
            <button
              style = {style}>
                <Link to="/">
                  SearchBar
                </Link>
            </button>
            <button
              style = {style}>
                <Link to="/">
                  HomePage
                </Link>
            </button>
          </Router>
        </div>
      </header>
    )
  }

export default Header