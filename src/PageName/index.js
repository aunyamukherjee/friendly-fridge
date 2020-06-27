import React from 'react';
import './PageName.css';

const pageName = (props) => {
    return (
        <p onClick={props.click}>{props.name}</p>
    
    )
};

export default pageName; 