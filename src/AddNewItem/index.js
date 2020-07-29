import React from 'react';
import "./AddNewItem.css";

const style = {
    backgroundColor: 'rgba(163, 184, 193, 0.92)',
    font: 'inherit',
    border: '1px solid blue',
    padding: '10px',
    cursor: 'pointer',
    justifyContent: 'center',
    margin: '25px'
  };

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
            <button
                    style = {style}
                    /*onClick={() => }*/ >
                    Add
            </button>
        </div>
    )
}

export default AddNewItem;