import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './Header/Navigation';
import Footer from './Footer';
import Users from './Users/Users';

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
import { AuthContext } from './shared/context/auth-context';


const App = (props) => {

  // since i got rid of the state portion in this code
  // I could change this back to a function (did it)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes=(
      <React.Fragment>
          <Route path="/" exact>
            <HomePageBody />
          </Route>
          <Route path="/:foodgroupid/food" exact>
            <FoodGroupFoods />
          </Route>
          <Route path= "/food/details" exact>
            <FoodItemDetails />
          </Route>
          <Route path="/food/new" exact>
                  <NewItem />
          </Route>
          <Route path="/users" exact>
                  <Users />
          </Route>
          <Redirect to="/" />
      </React.Fragment>
    );
  } else {
    routes=(
      <React.Fragment>
          <Route path="/" exact>
            <HomePageBody />
          </Route>
          <Route path="/:foodgroupid/food" exact>
            <FoodGroupFoods />
          </Route>
          <Route path= "/food/details" exact>
            <FoodItemDetails />
          </Route>
          <Route path="/auth" exact>
                  <Auth />
          </Route>
          <Redirect to="/auth" />
      </React.Fragment>
    );
  }
    return (
      <div>
        <AuthContext.Provider 
          value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}
        >
          <Router>
            <Navigation className="Header"/>
            <main>
            <div className = "Body">
              <Switch>
                  {routes}
              </Switch>
            </div>
            </main>
          </Router>
        </AuthContext.Provider>
        <Footer className = "Footer"/>
      </div>
    );
}


export default App;
