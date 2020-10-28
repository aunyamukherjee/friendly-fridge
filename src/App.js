import React, { Suspense } from 'react';
// import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './Header/Navigation';
import Footer from './Footer';


// import Users from './Users/Users';
import HomePageBody from './HomePageBody';
// import UnauthHomePageBody from './HomePageBody';
// import NewFoodGroup from './NewFoodGroup/NewFoodGroup';
// import NewItem from "./NewItem/NewItem";
// import FoodItem from "./FoodItems/FoodItem";
// import Auth from "./Auth";
// import FoodGroupFoods from "./FoodItems/FoodGroupFoods";
// import UpdateFood from './UpdateFood/UpdateFood';
// import DeleteFoodGroup from './DeleteFoodGroup/DeleteFoodGroup';

import { AuthContext } from './shared/context/auth-context';

import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/UIElements/LoadingSpinner';

//lazy loaded components
const Users = React.lazy(()=> import('./Users/Users'));
const UnauthHomePageBody = React.lazy(()=> import('./HomePageBody'));
const NewFoodGroup = React.lazy(()=> import('./NewFoodGroup/NewFoodGroup'));
const NewItem = React.lazy(()=> import('./NewItem/NewItem'));
const FoodItem = React.lazy(()=> import('./FoodItems/FoodItem'));
const Auth = React.lazy(()=> import('./Auth'));
const FoodGroupFoods = React.lazy(()=> import('./FoodItems/FoodGroupFoods'));
const UpdateFood = React.lazy(()=> import('./UpdateFood/UpdateFood'));
const DeleteFoodGroup = React.lazy(()=> import('./DeleteFoodGroup/DeleteFoodGroup'));


const App = (props) => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes=(
      <React.Fragment>
          <Route path="/" exact>
            <HomePageBody />
          </Route>
          <Route path="/:foodgroupid/food" exact>
            <FoodGroupFoods />
          </Route>
          <Route path="/foods/:foodid" exact>
            <FoodItem />
          </Route>
          <Route path="/food/new" exact>
            <NewItem />
          </Route>
          <Route path="/foodgroup/new" exact>
            <NewFoodGroup />
          </Route>
          <Route path="/foodgroup/delete" exact>
            <DeleteFoodGroup />
          </Route>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/foodedit/:foodid" exact>
            <UpdateFood/>
          </Route>
          <Redirect to="/" />
      </React.Fragment>
    );
  } else {
    routes=(
      <React.Fragment>
          <Route path="/" exact>
            <UnauthHomePageBody />
          </Route>
          <Route path="/foodedit/:foodid" exact>
            <UpdateFood/>
          </Route>
          <Route path="/:foodgroupid/food" exact>
            <FoodGroupFoods />
          </Route>
          <Route path="/foods/:foodid" exact>
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
          value={{
            isLoggedIn: !!token, 
            token: token,
            userId: userId,
            login: login, 
            logout: logout
          }}
        >
          <Router>
            <Navigation className="Header"/>
            <main>
            <div className = "Body">
              <Switch>
                  <Suspense fallback={<div className="center"><LoadingSpinner /></div>}>
                    {routes}
                  </Suspense>
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
