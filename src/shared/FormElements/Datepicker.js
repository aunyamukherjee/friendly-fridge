import React, { useReducer, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

import { validate } from '../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        selected: action.val,
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

const Datepicker = props => {
  const [date, setDate] = useState(new Date());

  const [inputState, dispatch] = useReducer(inputReducer, {
    selected: '',
    isTouched: false,
    isValid: false
  });

const {id, onInput} = props;
const { selected, isValid} = inputState;

  useEffect(() => {
      props.onInput(props.id, inputState.selected, inputState.isValid)
  }, [id, selected, isValid, onInput]);

  const changeHandler = event => {
    const event1 = event.target;
    dispatch({
      type: 'CHANGE',
      selected: event1,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };
  const handleChange = date => {
    setDate(date);
  };

  const element =
    (
      <DatePicker className="form-control__select"
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={handleChange}
        selected = {date}
      >
      </DatePicker>    
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

export default Datepicker;