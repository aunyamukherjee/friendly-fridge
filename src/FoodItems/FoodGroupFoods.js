import React, { useEffect, useState } from 'react';
import{ useParams} from 'react-router-dom';
import { useHttpClient } from '../shared/hooks/http-hook';
import ErrorModal from '../shared/UIElements/ErrorModal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';

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
        <LoadingSpinner/>
        </div>
      )}
      {!isLoading && loadedFoodGroupFoods &&
      <FoodsList items={loadedFoodGroupFoods} onDeleteFood={foodDeletedHandler} />}
      
    </React.Fragment>);
};

export default FoodGroupFoods;