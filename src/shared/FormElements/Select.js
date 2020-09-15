import React, {  useEffect, useState } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import { validate } from '../util/validators';
import { useDispatch } from 'react-redux';


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

const dispatch = useDispatch();


  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedFoodgroups, setLoadedFoodgroups ] = useState([]);


useEffect(() => {

    const fetchFoodgroups = async () => {
      try {
          const responseData = await sendRequest('http://localhost:5000/api/foodgroups')
          setLoadedFoodgroups(responseData);
         //console.log('ResponseData'+ JSON.stringify(responseData));

        } catch (err) {}
    };
    fetchFoodgroups();
  }, [sendRequest]);

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







