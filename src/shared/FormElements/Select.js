import React, { useReducer, useEffect, useState } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import { validate } from '../util/validators';
import { useDispatch } from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import Dropdown from 'react-bootstrap/Dropdown';

import './Input.css';



const inputReducer = (state, action) => {
   switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        foodgroupid: action.val,
        isValid: true
      };
    case 'TOUCH': {
      console.log('Inside Select.js:inputReducer:state.foodgroupid='+state.foodgroupid);
      console.log('Inside Select.js:inputReducer:action.val='+action.val);
    
      return {
        ...state,
        isTouched: true,
        foodgroupid: action.val,
        isValid: true
      }
   }
    default:
      return state;
  }
};
const Select = props => {
const [selValue, setSelValue]=useState('');
const [foodgroupid, setFoodgroupId] = useState("");
const dispatch = useDispatch();


  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedFoodgroups, setLoadedFoodgroups ] = useState([]);


useEffect(() => {

    const fetchFoodgroups = async () => {
      try {
          const responseData = await sendRequest('http://localhost:5000/api/foodgroups')
          setLoadedFoodgroups(responseData);
         console.log('ResponseData'+ JSON.stringify(responseData));

        } catch (err) {}
    };
    fetchFoodgroups();
  }, [sendRequest]);

  const changeHandler = (eventKey, event) => {
    setSelValue(eventKey);
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = (eventKey, event) => {
    console.log('eventKey:', eventKey);    
    setSelValue(eventKey);
    dispatch({
      type: 'SELECTED',
      foodgroupid: {eventKey},
      isValid: true
    });
  };



const handleSelect= (eventKey, event) => {
    //eventKey.preventDefault();
     //console.log('selectOptions.id='+selectOptions.id);
    setSelValue(eventKey);
    console.log('eventKey:'+eventKey);
    console.log('selValue:'+selValue);
}
//return (

  //   <React.Fragment>
  //   <select
  //       className="form-control__select"
  //       title="Foodgroups"
  //       id="dropdown-menu-align-right"
  //       onClick={touchHandler}
  //       onChange={touchHandler}
  //       onTouch={touchHandler}
  //       onSelect={touchHandler}
  //       selected={selValue}
  //       foodgroupid={selValue}
  //       value={selValue}
  //   >    
  //   <label htmlFor={props.id}>{props.label}</label> 
  //   {loadedFoodgroups.map(selectOptions => (
  //       <option
  //           key= {selectOptions._id} 
  //           value = {selectOptions._id}
  //         >{selectOptions.name}
  //       </option>
  //    ))}

  //   </select>
  //   </React.Fragment>
  // );

  return (

    <React.Fragment>
    <DropdownButton 
        class="dropbtn"
        alignRight
        drop="right"
        title="Foodgroups"
        id="dropdown-menu-align-right"
        onChange={touchHandler}
        onTouch={touchHandler}
        onSelect={touchHandler}
        selected={selValue}
        foodgroupid={selValue}
        value={selValue}
    >    
    <label htmlFor={props.id}>{props.label}</label> 
    {loadedFoodgroups.map(selectOptions => (
        <Dropdown.Item 
            onSelect={touchHandler}
            key= {selectOptions._id}
            class="dropdown-content"
            eventKey = {selectOptions._id}>{selectOptions.name}
        </Dropdown.Item>
     ))}

    </DropdownButton>
    </React.Fragment>
  );
};
export default Select;

// /* Change the background color of the dropdown button when the dropdown content is shown */
// .dropdown:hover .dropbtn {
//   background-color: #3e8e41;
// }
// </style>

// <div class="dropdown">
//   <button class="dropbtn">Dropdown</button>
//   <div class="dropdown-content">
//     <a href="#">Link 1</a>
//     <a href="#">Link 2</a>
//     <a href="#">Link 3</a>
//   </div>
// </div>










