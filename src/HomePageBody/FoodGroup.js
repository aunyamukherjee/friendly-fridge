import React from 'react';
import { Link } from 'react-router-dom';
import './FoodGroup.css';
import Button from '../shared/FormElements/Button';




const FoodGroup = props => {

    const onClickHandler = () => {
        console.log('OnClickHandler: props.name='+ props.name + 
        'props.key='+props.key + 
        'props.id='+ props.id + 
        'props.foods='+ props.foods);
    }
    return (
        <li>
            <div>
                {/*This needs tp be dynamic, but i have to figure out what the routing url is for each thing */}
                <Link to={`/${props.id}/food`}> 
                    <div className="Food-Group">
                        <h2 
                            onClick={onClickHandler}>
                                {props.name}
                        </h2>
                    </div>
                </Link>
            </div>
        </li>
    );
}

export default FoodGroup;
