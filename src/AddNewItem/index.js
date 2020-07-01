import React from 'react';
import "./AddNewItem.css";

const AddNewItem = (props) => {
    return (
        <div AddNewItem-container>
            <div className= "Title" >Add New Item</div>
            <div className= "AddNewItems-items">
                <p>Name:</p>
                <input type="text" onChange= {props.changed} value = {props.name} />
            </div>
            <div className= "AddNewItems-items">
                <p>Expiry Date:</p>
                <input type="text" onChange= {props.changed} value = {props.name} />
            </div>
            <div className= "AddNewItems-items">
                <p>Quantity:</p>
                <input type="text" onChange= {props.changed} value = {props.name} />
            </div>
            <div className= "AddNewItems-items">
                <p>Food Group:</p>
                <input type="text" onChange= {props.changed} value = {props.name} />
            </div>
            <div className= "AddNewItems-items">
                <p>Comments:</p>
                <input type="text" onChange= {props.changed} value = {props.name} />
            </div>
        </div>
    )
}

export default AddNewItem;