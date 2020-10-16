import React, { useEffect, useState } from 'react';
import{ useParams} from 'react-router-dom';
import { useHttpClient } from '../shared/hooks/http-hook';
import ErrorModal from '../shared/UIElements/ErrorModal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';
import Button from '../shared/FormElements/Button';
import Card from '../shared/UIElements/Card';

import '../shared/UIElements/Card.css';

import FoodsList from './FoodsList';

const FoodGroupFoods = props => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedFoodGroupFoods, setLoadedFoodGroupFoods ] = useState([]);
    const foodgroupid = useParams().foodgroupid;

    useEffect(() => {
      
        const fetchFoodGroupFoods = async () => {
          try {
              const responseData = await sendRequest(`http://localhost:5000/api/food/foodgroup/${foodgroupid}`);
              setLoadedFoodGroupFoods(responseData.foods);
          } catch (err) {}
        };
        fetchFoodGroupFoods();
      }, [sendRequest, foodgroupid]);

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