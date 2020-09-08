import React, { useReducer, useEffect, useState } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import { validate } from '../util/validators';
import SelectHelper from './Select';

import './Input.css';

const inputReducer = (state, action) => {
  console.log('Inside Select.js:inputReducer:state.selected='+state.selected);

  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        selected: state.selected,
        isValid: validate(action.val, action.validators)
      };
    // case 'TOUCH': {
    //   return {
    //     ...state,
    //     isTouched: true,
    //     selected: state.selected
    //   }
    }
    default:
      return state;
  }
};

const Select = props => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedFoodgroups, setLoadedFoodgroups ] = useState([]);

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
    isValid: false,
    selected: ''
  });

const {id, onInput} = props;
const { value, isValid} = inputState;

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

  // useEffect(() => {
  //     props.onInput(props.id, inputState.value, inputState.isValid)
  // }, [id, value, isValid, onInput]);
  
  const changeHandler = event => {
    console.log('changeHandler:event.target.value'+event.target.value);
    const selectedOption = loadedFoodgroups.filter(foodgroup => foodgroup.name ===event.target.value);
    console.log('changeHandler:selectedOption'+selectedOption.name);
    console.log('changeHandler:selectedOption'+selectedOption._id);
    console.log('change handler selectedOption.id='+selectedOption);
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      selected: selectedOption[0]._id,
      validators: props.validators
    });
   };

  // const touchHandler = event => {
  //   console.log('touch handler event.target.value='+event.target.value);
  //   dispatch({
  //     type: 'TOUCH',
  //     val: event.target.value,
  //     selected: event.target.value,
  //     validators: props.validators
  //   });  };

  const element =
    (
      <select className="form-control__select"
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        selected={inputState.selected}
        //selected={inputState.value}
      >              
      {loadedFoodgroups.map(selectOptions => (
        <option 
        key = {selectOptions.id}
        value = {selectOptions.id}>
        {selectOptions.name} 
        </option>
      ))}
            {/* option={options} /> */}
            {/* <option value="noFoodgroup">Select food group</option>
            <option value="dairy">Dairy</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
            <option value="meat">Meat, Fish and Eggs</option>
            <option value="vegetables">Vegetables</option>
            <option value="drinks">Drinks</option>
            <option value="carbs">Carbs</option>
            <option value="5f43d1cca7812d8c3f87c2f6">Fats</option>
            <option value="highsugar">High Sugar</option> */}
        </select>
    );

  return (
    <div
      className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Select;