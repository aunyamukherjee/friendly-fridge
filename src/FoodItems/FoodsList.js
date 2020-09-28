import React from 'react';
import FoodItemsList from './FoodItemsList';
// import FoodItem from './FoodItem';
import './FoodsList.css';

const FoodsList = props => {
    return(
        <React.Fragment>
        {/* <h2>FoodGroup Name goes here(?)</h2> */}
        <ul className="foods-list">
            {props.items.map(food => <FoodItemsList 
            key={food.id} 
            id={food.id}
            name={food.name}
            details ={food.details}
            expirydate = {food.expirydate}
            qty={food.qty}
            foodgroupid={food.foodgroupid}
            onDelete= {props.onDeleteFood}
            />)}
        </ul>
        </React.Fragment>)
};

export default FoodsList;