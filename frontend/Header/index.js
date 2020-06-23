
import React, {Component} from 'react';
import { render } from '@testing-library/react';
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
      {name: 'Fruit'}
    ],
    otherState: 'some other value'
  }

  /*switchPageNameHandler = () (use this to create new categories*/

  render () {
    return (
      <div className="Header-container">
          <h1>FriendlyFridge  </h1>
        <PageName name = {this.state.titles[0].name}/>  
        <button
          style = {style}
          /*onClick={() => }*/ >Add
        </button>
        <button
          style = {style}
          /*onClick={() => }*/ >Login
        </button>
        <a
          className="App-link"
          href="https://blacklivesmatter.carrd.co/"
          target="_blank"
          rel="noopener noreferrer">
            Home Page
        </a>
      </div>
    )
  }
}

export default Header;