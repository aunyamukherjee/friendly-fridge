import React, { useReducer, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { useDispatch } from 'react-redux';

import { validate } from '../util/validators';
import './Input.css';
import "react-datepicker/dist/react-datepicker.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        selected: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': 
      return {
        ...state,
        isTouched: true
      }
      case 'DATE_SELECTED': 
        return {
          ...state,
          expirydate: action.val,
          isValid: true
        }
    
    default:
      return state;
  }
};

const Datepicker = props => {
  const [selectedDate, setSelectedDate] = useState('');
  const dispatch = useDispatch();
  const [inputState] = useReducer(inputReducer, {
    expirydate: '',
    isValid: true
  });

  function formatDate(date) {
    var monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    // return  monthNames[monthIndex] + ' ' + day + ' ' + year;
    if (monthIndex+1 < 10) {
      return  "0"+(monthIndex+1) + '/' + day + '/' + year;
    }
    else {
      return  (monthIndex+1)+ '/' + day + '/' + year;
    }
  }

const {id, onInput} = props;
const { selected, isValid} = inputState;

  useEffect(() => {
      props.onInput(props.id, inputState.expirydate, inputState.isValid)
  }, [id, selectedDate, isValid, onInput]);


  const changeHandler = (eventKey, event) => {

    let selDate = JSON.stringify(eventKey);
    let year = selDate.slice(1,5);
    let month = selDate.slice(6,8);
    let day = selDate.slice(9,11);
    let finalDate= month+"/"+day+"/"+year;
    setSelectedDate(finalDate);
    dispatch({
      type: 'DATE_SELECTED',
      expirydate: finalDate,
      isValid: true
    });
  };




  const element =
    (
      <DatePicker 
        // id={props.id}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onSelect={changeHandler}
        onInput={changeHandler}
        expirydate = {selectedDate}
        eventKey={props.value}
        // selected={selectedDate}
        value={selectedDate}
        name={props.id}
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