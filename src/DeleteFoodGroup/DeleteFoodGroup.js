import React, { useEffect, useState }  from 'react';

import ListofFoodGroups_delete from "./ListofFoodGroups_delete";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';
import { useContext } from 'react';


import './DeleteFoodGroup.css';
const axios = require('axios');


const DeleteFoodGroup = (props) => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedFoodgroups, setLoadedFoodgroups ] = useState([]);
    const auth = useContext(AuthContext);

        useEffect(() => {
      const fetchFoodgroups = async () => {
        try {
          console.log("Starting axios call for fetchfoodgroupfoods");
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
          console.log("setLoadedFoodGroupFoods finished");
      } catch (err) {console.log("Error in axios");}
    };
    fetchFoodgroups();
    }, [auth.token]);

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
              <LoadingSpinner />
          </div>
        )}
        {auth.isLoggedIn && (
          <div className = "HomePageBody-container"> 
          {!isLoading && loadedFoodgroups && 
              <ListofFoodGroups_delete items={loadedFoodgroups} />}
        </div>
        )}

     </React.Fragment>
     
    );
}

export default DeleteFoodGroup;