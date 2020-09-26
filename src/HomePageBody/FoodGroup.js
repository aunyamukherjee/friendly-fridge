import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../shared/UIElements/Card';
import './FoodGroup.css';

const FoodGroup = props => {

    const onClickHandler = () => {
        console.log('OnClickHandler: props.name='+ props.name + 
        'props.key='+props.key + 
        'props.id='+ props.id + 
        'props.foods='+ props.foods);
    }
    return (
        <li className="foodgroup-item">
            <Card className="foodgroup-item__content">
                <Link to={`/${props.id}/food`}> 
                    <div className="foodgroup-item__info">
                        <h2 
                            onClick={onClickHandler}>
                                {props.name}
                        </h2>
                    </div>
                </Link>
            </Card>
        </li>
    );
}

export default FoodGroup;
