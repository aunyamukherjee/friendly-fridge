import React, {useEffect }  from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../shared/hooks/http-hook';
import Card from '../shared/UIElements/Card';

import { Link } from 'react-router-dom';
import '../shared/UIElements/Card.css';
import './FoodGroup.css';


const FoodGroup = props => {
    //const { isLoading, error, sendRequest, clearError } = useHttpClient();
    console.log('Inside FoodGroup: props='+ JSON.stringify(props));
    const extractedId = props.id;
    const clickHandler = () => {

        console.log('clicked on link for:'+ props.id+"/food");
    }
    
    return (
        // <li>
        //     <div>
        //         {/*This needs tp be dynamic, but i have to figure out what the routing url is for each thing */}
        //         <Link to={`/${props.id}/food`}>
        //             <div className="Food-Group">
        //                 <h2>{props.name}</h2>
        //             </div>
        //         </Link>
        //     </div>
        // </li>
        <li className="user-item">
        <Card className="user-item__content">
        <div className="user-item__info">
            <h2 onClick={clickHandler}>{props.name}</h2>
        </div>
        </Card>
        </li>
    );
}

export default FoodGroup;

