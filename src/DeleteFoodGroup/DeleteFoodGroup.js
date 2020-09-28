import React, { useEffect, useState }  from 'react';

import ListofFoodGroups_delete from "./ListofFoodGroups_delete";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';
import { useContext } from 'react';
import Button from "../shared/FormElements/Button";
import Card from "../shared/UIElements/Card";

import './DeleteFoodGroup.css';



const DeleteFoodGroup = (props) => {
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
          <div className = "HomePageBody-container"> 
          {!isLoading && loadedFoodgroups && 
              <ListofFoodGroups_delete items={loadedFoodgroups} />}
        </div>
        )}

     </React.Fragment>
     
    );
}

export default DeleteFoodGroup;