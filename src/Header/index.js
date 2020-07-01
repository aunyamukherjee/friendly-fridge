import React, {Component} from 'react';
// import { render } from './node_modules/@testing-library/react';
import './Header.css';
import PageName from '../PageName';


const style = {
  backgroundColor: 'white',
  font: 'inherit',
  border: '1px solid blue',
  padding: '8px',
  cursor: 'pointer',
  justifyContent: 'center',
  margin: '8px'
};

class Header extends Component {
  state = {
    titles: [
      {name: 'Home'},
      {name: 'Dairy'},
      {name: 'Veggies'},
      {name: 'Fruit'},
      {name: 'Add New Item'}
    ],
    otherState: 'some other value'
  }

  /*switchPageNameHandler = () (use this to create new categories*/

  render () {
    return (
      <div className="Header-container">
        
        <div className= "Logo">
          <p>FriendlyFridge</p>      
        </div>

        <div className= "Page-Title">
          <PageName name = {this.state.titles[4].name}/>  
        </div>

        <div className= "Header-button">
          <p>
          <button
            style = {style}
            /*onClick={() => }*/ >
              Add
          </button>
          <button
            style = {style}>
              Login
          </button>
          <button
            style = {style}>
              HomePage
          </button>
          <button
            style = {style}>
              SearchBar
          </button>
          </p>
        </div>
        
        {/* <div className= "Header-button">
          <button
            style = {style}>
              Login
          </button>
        </div>
        
        <div className= "Header-link">
          <a
            className="App-link"
            href="https://blacklivesmatter.carrd.co/"
            target="_blank"
            rel="noopener noreferrer">
              Home Page
          </a>
        </div>

        <div>
          <p>
            SearchBar
          </p>
        </div> */}
        
      </div>
    )
  }
}

export default Header