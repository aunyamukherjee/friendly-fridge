import React from 'react';
import './PageName.css';

const pageName = (props) => {
    return (
        <div className="PageName">
        <p onClick={props.click}>{props.name}</p>
        </div>
    
    )
};

export default pageName; 