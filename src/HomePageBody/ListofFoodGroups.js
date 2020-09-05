import React from 'react';
import './ListofFoodGroups.css'
import FoodGroup from "./FoodGroup";
import Card from '../shared/UIElements/Card';

const ListofFoodGroups = (props) => {
    if (props.items.length===0) {
      return (
        <div className = "staticText">
          No Food Groups Yet! Add an item to start your fridge!
        </div>
      );
    }
      return (
        <div className="foodgroup-header">Click on one of the food groups to see what you have available
        <ul className="foodgroup-item">
          
          <Card className="foodgroup-item__content">

            <div className="foodgroup-item__info">
              {props.items.map(groups => (
                <FoodGroup 
                key = {groups._id} 
                id={groups._id} 
                name={groups.name} 
                foods={groups.foods} 
                /> 
              ))}
            </div>
          </Card>
        </ul>
        </div>
      )
    }

export default ListofFoodGroups;