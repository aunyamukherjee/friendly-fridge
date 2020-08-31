import React from 'react';
import "./FoodItemDetails.css";

// delete button

const style = {
    backgroundColor: 'rgba(163, 184, 193, 0.92)',
    font: 'inherit',
    border: '1px solid blue',
    padding: '10px',
    cursor: 'pointer',
    justifyContent: 'center',
    margin: '25px'
  };

const FoodItemDetails = (props) => {
    return (
        <div className="FoodItemDetails-container">
            <div className= "Title" >Food Item Details</div>
            <div className= "FoodItemDetails-items">
                <p>Details:</p>
                <input type="text" onChange= {props.changed} value = {props.name} />
            </div>
            <div className= "FoodItemDetails-items">
                <p>Expiry Date:</p>
                <input type="text" onChange= {props.changed} value = {props.name} />
            </div>
            <div className= "FoodItemDetails-items">
                <p>Quantity:</p>
                <input type="text" onChange= {props.changed} value = {props.name} />
            </div>
            <div className= "FoodItemDetails-items">
                <p>Food Group:</p>
                <input type="text" onChange= {props.changed} value = {props.name} />
            </div>
            <div className= "FoodItemDetails-items">
                <p>Comments:</p>
                <input type="text" onChange= {props.changed} value = {props.name} />
            </div>
            <div className = "button">
                <button
                    style = {style}
                    /*onClick={() => }*/ >
                    Edit
                </button>
            </div>
        </div>
    )
}

export default FoodItemDetails;