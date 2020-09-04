import React, { useEffect, useState }  from 'react';

import ListofFoodGroups from "./ListofFoodGroups";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { useHttpClient } from '../shared/hooks/http-hook';

import './HomePageBody.css';


const HomePageBody = (props) => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedFoodgroups, setLoadedFoodgroups ] = useState([]);

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
        {/* <div className = "HomePageBody-container"> */}
        {!isLoading && loadedFoodgroups && 
            <ListofFoodGroups items={loadedFoodgroups} />}
     </React.Fragment>
     
    );
}

export default HomePageBody;