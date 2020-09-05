import React, {useEffect, useState }  from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../shared/hooks/http-hook';
import Card from '../shared/UIElements/Card';
import FoodItemsList from '../FoodItems/FoodItemsList';
import Modal from '../shared/UIElements/Modal';

import { Link } from 'react-router-dom';
import '../shared/UIElements/Card.css';
import Button from '../shared/FormElements/Button';
import './FoodGroup.css';


const FoodGroupModal = props => {
    const [showFoodgroupListItems, setShowFoodgroupListItems] = useState(false);

    const openFoodgroupListItemsHandler = () => setShowFoodgroupListItems(true);
    const closeFoodgroupListItemsHandler = () => setShowFoodgroupListItems(false);

    //const { isLoading, error, sendRequest, clearError } = useHttpClient();
    //console.log('Inside FoodGroupModal: props='+ JSON.stringify(props));
    const extractedId = props.id;
    const clickHandler = () => {

        //console.log('clicked on link for:'+ props.id+"/food");
        // <div>
        //      <FoodItemsList name={props.name} id={props.id}/> 
        // </div>

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
        <React.Fragment>
            <Modal 
            show={showFoodgroupListItems} 
            onCancel={closeFoodgroupListItemsHandler} 
            header={props.title}  
            contentClass="place-item__modal-content"
            footerClass="place-item__modal-actions"
            footer={<Button onClick={closeFoodgroupListItemsHandler}>CLOSE</Button>}
            >
                <div className="food-container">
                <li className="user-item">
                    <Card className="user-item__content">
                        <div className="user-item__info">
                            <h2 onClick={clickHandler}>{props.name}</h2>
                        </div>
                    </Card>
                </li>
                </div>
            </Modal>

        </React.Fragment>
    );
}

export default FoodGroupModal;

