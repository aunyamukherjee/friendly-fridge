import React from 'react';
import './ListofFoodGroups_delete.css'
import FoodGroup_delete from "./FoodGroup_delete";
import Card from '../shared/UIElements/Card';

const ListofFoodGroups_delete = (props) => {
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
                <FoodGroup_delete 
                key = {groups._id} 
                id={groups._id} 
                name={groups.name} 
                foods={groups.foods} 
                /> 
              ))}
        </ul>
      )
    }

export default ListofFoodGroups_delete;