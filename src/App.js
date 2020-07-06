import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Footer from './Footer';
// import "./Footer/Footer.css";
// import { render } from '@testing-library/react';
import HomePageBody from './HomePageBody';
import FoodGroupListView from "./FoodGroupListView";
import AddNewItem from "./AddNewItem";
import Login from "./Login";
import SignUp from "./SignUp";


const App = (props) => {

  // since i got rid of the state portion in this code
  // I could change this back to a function (did it)

    return (
      <div>
        <Header className ="Header"/>
        <Router>
          <div className = "Body">
            <Switch>
              <Route path="/" exact>
                <HomePageBody />
              </Route>
              <Route path="/:foodgroupname/food" exact>
                <FoodGroupListView />
              </Route>
              <Route path="/food/new" exact>
                <AddNewItem />
              </Route>
              <Route path="/authenticate/login" exact>
                <Login />
              </Route>
              <Route path="/authenticate/signup" exact>
                <SignUp />
              </Route>
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
        <Footer className = "Footer"/>
      </div>
    );
}


export default App;
