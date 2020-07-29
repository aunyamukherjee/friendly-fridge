import React from 'react';
import './ListofFoodGroups.css'
import FoodGroup from "./FoodGroup";

const ListofFoodGroups = (props) => {
    if (props.items.length===0) {
      return (
        <div className = "staticText">
          No Food Groups Yet! Add an item to start your fridge!
        </div>
      );
    }
      return (
        <ul>
            <div className = "staticText">
        Click on one of the food groups to see what you have available
      </div>
          {props.items.map(groups => (
            <FoodGroup 
            key = {groups.id} 
            id={groups.id} 
            name={groups.name} 
            foods={groups.foods} 
            /> /*not sure hpw this is going to work yet*/
          ))}
        </ul>
      )
    }

export default ListofFoodGroups;