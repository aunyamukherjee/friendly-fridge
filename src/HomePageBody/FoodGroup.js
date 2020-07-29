import React from 'react';
import { Link } from 'react-router-dom';
import './FoodGroup.css';


const FoodGroup = (props) => {
    return (
        <li>
            <div>
                {/*This needs tp be dynamic, but i have to figure out what the routing url is for each thing */}
                <Link to={'/$props.name}'}>
                    <div className="Food-Group">
                        <h2>{props.name}</h2>
                    </div>
                </Link>
            </div>
        </li>
    );
}

export default FoodGroup;