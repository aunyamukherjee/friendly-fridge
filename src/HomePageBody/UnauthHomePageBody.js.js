import React, { useEffect, useState }  from 'react';

import ListofFoodGroups from "./ListofFoodGroups";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { useHttpClient } from '../shared/hooks/http-hook';

import './HomePageBody.css';


const UnauthHomePageBody = (props) => {
 
    return (
      <React.Fragment>
        {(
          <div className="center">
              <LoadingSpinner />
          </div>
        )}
         <div className = "HomePageBody-container"> 
          Please login or create an account to use the Friendly Fridge!
          <Button to="">LOGIN</Button>
          <Button to="">SIGNUP</Button>
        </div>
     </React.Fragment>
     
    );
}

export default UnauthHomePageBody;