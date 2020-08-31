import React from 'react';
import FoodItemsList from './FoodItemsList';
// import FoodItem from './FoodItem';
import './FoodsList.css';

const FoodsList = props => {
    return(
        <ul className="foods-list">
            {props.items.map(food => <FoodItemsList 
            key={food.id} 
            id={food.id}
            name={food.name}
            details ={food.details}
            expirydate = {food.expirydate}
            qty={food.qty}
            comments={food.comments}
            foodgroupid={food.foodgroupid}
            />)}
        </ul>)
};

export default FoodsList;