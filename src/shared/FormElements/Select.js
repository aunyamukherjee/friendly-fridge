import React, {  useEffect, useState } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/auth-context';
import { useContext } from 'react';

import './Input.css';

const axios = require('axios');

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

const dispatch = useDispatch();


  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedFoodgroups, setLoadedFoodgroups ] = useState([]);
  const auth = useContext(AuthContext);


useEffect(() => {

    const fetchFoodgroups = async () => {
  try {
    console.log("Starting axios call for foodgroups");
    const responseData = 
      await axios.get('http://localhost:5000/api/foodgroups',
        { headers: {
         'Content-Type': 'application/json' , 
         Authorization: 'Bearer '+ auth.token 
        }}
      );
      console.log("responseData="+ responseData.data);
    setLoadedFoodgroups(responseData.data);
    console.log("set Loaded Food Groups finished");
} catch (err) {console.log("Error in axios");}
};
fetchFoodgroups();
}, [auth.token]);


  const changeHandler = (eventKey: React.SyntheticEvent<EventTarget>, event) => {
    setSelValue(eventKey.target.value);
    dispatch({
      type: 'SELECTED',
      foodgroupid: eventKey.target.value,
      isValid: true
    });
  };

return (

    <React.Fragment>
    <label htmlFor={props.id}>{props.label}</label> 
    <select
        className="form-control__select"
        title="Foodgroups"
        id="dropdown-menu-align-right"
        onChange={changeHandler}
        selected={selValue}
        foodgroupid={selValue}
        value={selValue}
    >    

    {loadedFoodgroups.map(selectOptions => (
        <option
            key={selectOptions._id}
            value= {selectOptions._id}
            >{selectOptions.name}
        </option>
     ))}

    </select>
    </React.Fragment>
  );

};
export default Select;







