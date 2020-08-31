import React, { useReducer, useEffect } from 'react';


import { validate } from '../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      }
    }
    default:
      return state;
  }
};

const Select = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
    isValid: false
  });

const {id, onInput} = props;
const { value, isValid} = inputState;

  useEffect(() => {
      props.onInput(props.id, inputState.value, inputState.isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  const options = [
      {value: 'noFoodgroup', label: 'Select food group'},
      {value: 'dairy', label: 'Dairy'},
      {value: 'fruits', label: 'Fruits'},
      {value: 'grains', label: 'Grains'},
      {value: 'meat', label: 'Meat, Fish and Eggs'},
      {value: 'vegetables', label: 'Vegetables'},
      {value: 'drinks', label: 'Drinks'},
      {value: 'carbs', label: 'Carbs'},
      {value: 'fats', label: 'Fats'},
      {value: 'highsugar', label: 'High Sugar'}
  ]

  const element =
    (
      <select className="form-control__select"
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      >
            {/* option={options} /> */}
            <option value="noFoodgroup">Select food group</option>
            <option value="dairy">Dairy</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
            <option value="meat">Meat, Fish and Eggs</option>
            <option value="vegetables">Vegetables</option>
            <option value="drinks">Drinks</option>
            <option value="carbs">Carbs</option>
            <option value="fats">Fats</option>
            <option value="highsugar">High Sugar</option>
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