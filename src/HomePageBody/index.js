import React, { useEffect, useState }  from 'react';

import ListofFoodGroups from "./ListofFoodGroups";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';
import { useContext } from 'react';
import Button from "../shared/FormElements/Button";

import './HomePageBody.css';



const HomePageBody = (props) => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedFoodgroups, setLoadedFoodgroups ] = useState([]);
    const auth = useContext(AuthContext);

        useEffect(() => {
      
        const fetchFoodgroups = async () => {
          try {
              const responseData = await sendRequest('http://localhost:5000/api/foodgroups')
              setLoadedFoodgroups(responseData);
          } catch (err) {}
        };
        fetchFoodgroups();
      }, [sendRequest]);


    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
              <LoadingSpinner />
          </div>
        )}
        {auth.isLoggedIn && (
          <React.Fragment>
          <div className = "HomePageBody-container"> 
          {!isLoading && loadedFoodgroups && 
              <ListofFoodGroups items={loadedFoodgroups} />}
        </div>
        <div>
          <Button to="/foodgroup/new">ADD NEW FOODGROUP</Button>
        </div>
        </React.Fragment> )}
        {!auth.isLoggedIn && (
          <form>
          <div className = "HomePageBody-container"> 
            <h5>Please login or create an account to use the Friendly Fridge!</h5>
            <div>
              <Button to="/auth">LOGIN</Button>
              <Button to="/auth">SIGNUP</Button>
            </div>
          </div>
          </form>

        )}

     </React.Fragment>
     
    );
}

export default HomePageBody;