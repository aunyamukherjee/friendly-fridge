import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
// import "./Footer/Footer.css";
// import { render } from '@testing-library/react';
import HomePageBody from './HomePageBody';
import FoodGroupListView from "./FoodGroupListView";
import AddNewItem from "./AddNewItem";


const App = (props) => {

  // since i got rid of the state portion in this code
  // I could change this back to a function (did it)

    return (
      <div>
        <Header className ="Header"/>
      <div className = "Body">
        {/* <HomePageBody /> */}
        {/* <FoodGroupListView /> */}
        <AddNewItem />
      </div>
        
        <Footer className = "Footer"/>
      </div>
    );
}


export default App;
