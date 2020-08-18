import React from 'react';
import { Link } from 'react-router-dom';
import './HomePageBody.css';
// import FoodGroup from "./FoodGroup.js";
// import FoodsInGroup from '../FoodsInGroup';
import ListofFoodGroups from "./ListofFoodGroups";


const HomePageBody = (props) => {
      const GROUPS = [
        {id: 'u1', name: "Dairy", foods: "4"},
        {id: 'u3', name: "Fruits", foods: "4"},
        {id: 'u2', name: "Veggies", foods: "4"}
      ]
      //This is a dummy, i will change it to fetch information from mongo
    return (
       <div className = "HomePageBody-container">
      <ListofFoodGroups items={GROUPS}/>
     </div>
     //eventually these need to link to the list of foods
     
    );
}

export default HomePageBody;