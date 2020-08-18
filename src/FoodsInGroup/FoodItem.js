import React from 'react';
import "./FoodItem.css";
import Card from '../shared/UIElements/Card';
import Button from '../shared/FormElements/Button';
import Modal from '../shared/UIElements/Modal';

const FoodItem = (props) => {
    return ( 
    <React.Fragment>
        {/* <Modal></Modal> */}
        <li className= "food-item">
        <Card className="food-item__content">
        <div className="food-item__info">
            <h2>{props.title}</h2>
            <p>Details: {props.details}</p>
            <h3>Expiration Date: {props.expirydate}</h3>
            <h4>Quantity: {props.qty}</h4>
            <p>Comments: {props.comments}</p>
        </div>
        <div className="food-item__actions">
            <Button to={"/foods/${props.id}"}>EDIT</Button>
            <Button danger>DELETE</Button>
        </div>
        </Card>
    </li>
    </React.Fragment>
    )
};

export default FoodItem;




    //     <div>
    //         <div className ="Title">
    //             <p>Title Goes Here</p>
    //         </div>
    //         <div className= "List-Items-container">
    //             <div className= "List-Items">
    //                 <a
    //                 className="Food-link"
    //                 href="https://www.delish.com/cooking/recipe-ideas/a26977162/chocolate-ice-cream-recipe/"
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 >Milk
    //                 </a>
    //             </div>
    //             <div className= "List-Items">
    //                 <p>Hello</p>
    //             </div>
    //             <div className= "List-Items">
    //                 <p>Hello</p>
    //             </div>
    //             <div className= "List-Items">
    //                 <p>Hello</p>
    //             </div>
    //             <div className= "List-Items">
    //                 <p>Hello</p>
    //             </div>
    //             <div className= "List-Items">
    //                 <p>Hello</p>
    //             </div>
    //             <div className= "List-Items">
    //                 <p>Hello</p>
    //             </div>
    //         </div>
    //     </div>
    // )  