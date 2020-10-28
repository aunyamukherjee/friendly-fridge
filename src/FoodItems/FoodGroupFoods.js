import React, { useEffect, useState } from 'react';
import{ useParams} from 'react-router-dom';
import { useHttpClient } from '../shared/hooks/http-hook';
import ErrorModal from '../shared/UIElements/ErrorModal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';
import Button from '../shared/FormElements/Button';
import Card from '../shared/UIElements/Card';
import { AuthContext } from '../shared/context/auth-context';
import { useContext } from 'react';

import '../shared/UIElements/Card.css';

import FoodsList from './FoodsList';
const axios = require('axios');

const FoodGroupFoods = props => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedFoodGroupFoods, setLoadedFoodGroupFoods ] = useState([]);
    const foodgroupid = useParams().foodgroupid;
    const auth = useContext(AuthContext);

    useEffect(() => {
      
        const fetchFoodGroupFoods = async () => {
          try {

            const fgid = `${foodgroupid}`;
            console.log("Starting axios call for fetchfoodgroupfoods");
            const responseData = 
              await axios.get('http://localhost:5000/api/food/foodgroup/'+`${foodgroupid}`,
                { headers: {
                'Content-Type': 'application/json' , 
                Authorization: 'Bearer '+ auth.token 
                }}
              );
              console.log("responseData="+ JSON.stringify(responseData.data.foods));
              setLoadedFoodGroupFoods(responseData.data.foods);
            console.log("setLoadedFoodGroupFoods finished");
            console.log("LOaded foodgroups="+ loadedFoodGroupFoods);
        } catch (err) {console.log("Error in axios");}
      };
      fetchFoodGroupFoods();
      }, [auth.token, foodgroupid]);




      const foodDeletedHandler= (deletedFoodId) => {
        setLoadedFoodGroupFoods(prevFoods=> prevFoods.filter(food => food.id !==deletedFoodId));
      };

    return (
    <React.Fragment>
      <ErrorModal error={error} onClear = {clearError}/>
      {isLoading && (
        <div>
        <LoadingSpinner asOverlay/>
        </div>
      )}
      {!isLoading && loadedFoodGroupFoods &&
      
      <FoodsList items={loadedFoodGroupFoods} onDeleteFood={foodDeletedHandler} />}
      {loadedFoodGroupFoods.length ===0 && (
        <Card className="card__content">
          <h3>Empty Foodgroup! Want to add something?</h3>
          <Button to="/food/new">Add Food</Button>
          <h3></h3>
        </Card>
      )
      }
      
    </React.Fragment>);
};

export default FoodGroupFoods;