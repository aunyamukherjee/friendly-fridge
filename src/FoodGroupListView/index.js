import React from 'react';
import "./FoodGroupListView.css";

const FoodGroupListView = (props) => {
    return (
        <div className= "List-Items-container">
            <div className= "List-Items">
                <a
                className="Food-link"
                href="https://www.delish.com/cooking/recipe-ideas/a26977162/chocolate-ice-cream-recipe/"
                target="_blank"
                rel="noopener noreferrer"
                >Milk
                </a>
            </div>
            <div className= "List-Items">
                <p>Hello</p>
            </div>
            <div className= "List-Items">
                <p>Hello</p>
            </div>
            <div className= "List-Items">
                <p>Hello</p>
            </div>
            <div className= "List-Items">
                <p>Hello</p>
            </div>
            <div className= "List-Items">
                <p>Hello</p>
            </div>
            <div className= "List-Items">
                <p>Hello</p>
            </div>
        </div>
    )   
}

export default FoodGroupListView;