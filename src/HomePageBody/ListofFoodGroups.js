import React from 'react';
import './ListofFoodGroups.css'
import FoodGroup from "./FoodGroup";
import Card from '../shared/UIElements/Card';

const ListofFoodGroups = (props) => {
    if (props.items.length===0) {
      return (
        <div className = "center">
          <Card>
          No Food Groups Yet! Add an item to start your fridge!
          </Card>
        </div>
      );
    }
      return (
        <ul className="foodgroup-list">
              {props.items.map(groups => (
                <FoodGroup 
                key = {groups._id} 
                id={groups._id} 
                name={groups.name} 
                foods={groups.foods} 
                /> 
              ))}
        </ul>
      )
    }

export default ListofFoodGroups;