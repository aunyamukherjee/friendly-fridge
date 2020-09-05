import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './Header/Navigation';
import Footer from './Footer';
import Users from './Users/Users';

import HomePageBody from './HomePageBody';
//import UnauthenticatedHomePageBody from './HomePageBody/UnauthenticatedHomePageBody';

import NewItem from "./NewItem/NewItem";
import FoodItem from "./FoodItems/FoodItem";
import Auth from "./Auth";
import FoodGroupFoods from "./FoodItems/FoodGroupFoods";
import UpdateFood from './UpdateFood/UpdateFood';

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
          <Route path="/foods/:foodname" exact>
            <FoodItem />
          </Route>
          <Route path="/food/new" exact>
            <NewItem />
          </Route>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/foodedit/:foodname" exact>
            <UpdateFood/>
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
          {/* remove this from not logged in, just for testing purposes */}
          <Route path="/foodedit/:foodname" exact>
            <UpdateFood/>
          </Route>
          <Route path="/:foodgroupid/food" exact>
            <FoodGroupFoods />
          </Route>
          <Route path="/foods/:foodname" exact>
            <FoodItem />
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
