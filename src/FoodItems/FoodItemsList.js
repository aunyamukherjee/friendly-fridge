import React from 'react';
import "./FoodItemsList.css";
import Card from '../shared/UIElements/Card';
import Button from '../shared/FormElements/Button';


const FoodItemsList = props => {
    //const auth = useContext(AuthContext);
  
    return (
      <div className="center">
        <li className="food-item">
          <Card className="food-item__content">
            <div className="food-item__info">
              <h2>{props.name}</h2>
            </div>
            <div className="food-item__actions">
              {/* {auth.isLoggedIn && ( */}
                <Button inverse to={`/foods/${props.id}`}>details</Button>
              {/* )} */}
            </div>
          </Card>
        </li>
      </div>
    );
  };
  
  export default FoodItemsList;