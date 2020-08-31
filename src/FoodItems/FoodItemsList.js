import React from 'react';
import "./FoodItemsList.css";
import Card from '../shared/UIElements/Card';
import Button from '../shared/FormElements/Button';

const FoodItemsList = props => {
    //const auth = useContext(AuthContext);
  
    return (
        <li className="food-item">
          <Card className="food-item__content">
            <div className="food-item__info">
              <h2>{props.name}</h2>
            </div>
            <div className="food-item__actions">
              {/* {auth.isLoggedIn && ( */}
                <Button to={`/foods/${props.name}`}>VIEW</Button>
              {/* )} */}
            </div>
          </Card>
        </li>
    );
  };
  
  export default FoodItemsList;