import React, { useEffect, useState }  from 'react';
import dotenv from 'dotenv'

import ListofFoodGroups from "./ListofFoodGroups";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';
import { useContext } from 'react';
import Button from "../shared/FormElements/Button";
import Card from "../shared/UIElements/Card";

import './HomePageBody.css';


const axios = require('axios');

const HomePageBody = (props) => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedFoodgroups, setLoadedFoodgroups ] = useState([]);
    const auth = useContext(AuthContext);

        useEffect(() => {
      
          const fetchFoodgroups = async () => {
            try {
                console.log("Starting axios call for foodgroups");
                const responseData = 
                  // await axios.get('http://localhost:5000/api/foodgroups',
                  await axios.get(process.env.REACT_APP_BACKEND_URL+'/foodgroups',
                    { headers: {
                     'Content-Type': 'application/json' , 
                     Authorization: 'Bearer '+ auth.token 
                    }}
                  );
                  console.log("responseData="+ responseData.data);
                setLoadedFoodgroups(responseData.data);
                console.log("set Loaded Food Groups finished");
            } catch (err) {console.log("Error in axios");}
          };
          fetchFoodgroups();
      }, [auth.token]);


    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
              <LoadingSpinner asOverlay/>
          </div>
        )}
        {auth.isLoggedIn && (
          <React.Fragment>
          <div className = "HomePageBody-container"> 
          {!isLoading && loadedFoodgroups && 
              <ListofFoodGroups items={loadedFoodgroups} />}
        </div>
        <div className="Login-Card">
        <Button danger to="/foodgroup/delete">Delete Foodgroup</Button>
        <Button to="/foodgroup/new">Add Foodgroup</Button> 
        </div>
        </React.Fragment> )}
        {!auth.isLoggedIn && (
          <form>
          <Card className="Login-Card"> 
            <h5>Please login or create an account to use the Friendly Fridge!</h5>
            <div>
              <Button to="/auth">LOGIN</Button>
              <Button to="/auth">SIGNUP</Button>
            </div>
          </Card>
          </form>

        )}

     </React.Fragment>
     
    );
}

export default HomePageBody;