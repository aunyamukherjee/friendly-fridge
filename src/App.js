import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './Header/Navigation';
import Footer from './Footer';
// import "./Footer/Footer.css";
// import { render } from '@testing-library/react';
import HomePageBody from './HomePageBody';
import FoodsList from "./FoodsInGroup/FoodsList";
import NewItem from "./NewItem/NewItem";
import Login from "./Login";
import SignUp from "./SignUp";
import FoodItemDetails from "./FoodItemDetails";
import Auth from "./Auth";
import FoodGroupFoods from "./FoodsInGroup/FoodGroupFoods";


const App = (props) => {

  // since i got rid of the state portion in this code
  // I could change this back to a function (did it)

    return (
      <div>
        <Router>
          <Navigation className="Header"/>
          <main>
          <div className = "Body">
            <Switch>
              <Route path="/" exact>
                <HomePageBody />
              </Route>
              <Route path="/:foodgroupid/food" exact>
                <FoodGroupFoods />
              </Route>
              <Route path="/food/new" exact>
                <NewItem />
              </Route>
              <Route path= "/food/details" exact>
                <FoodItemDetails />
              </Route>
              <Route path="/auth" exact>
                <Auth />
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
          </main>
        </Router>
        <Footer className = "Footer"/>
      </div>
    );
}


export default App;
