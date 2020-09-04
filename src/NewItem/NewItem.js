import React, {useCallback, useReducer, useState } from 'react';
import Input from '../shared/FormElements/Input.js';
import Select from '../shared/FormElements/Select.js';
import Button from '../shared/FormElements/Button';
import Datepicker from '../shared/FormElements/Datepicker';
//import DatePicker from "react-datepicker";

import { 
  VALIDATOR_REQUIRE, 
  VALIDATOR_MINLENGTH
} from '../shared/util/validators';

//import { useHttpClient } from '../shared/hooks/http-hook';

import "./NewItem.css";


const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (const inputId in state.inputs) {
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, isValid: action.isValid }
          },
          isValid: formIsValid
        };
      default:
        return state;
    }
  };
  const itemSubmitHandler = event => {
  // const itemSubmitHandler = event => {
  //   event.preventDefault();
  //   sendRequest(
  //     'http://localhost:5000/api/food',
  //     'POST',
  //     JSON.stringify({
  //       name: formState.inputs.name.value
  //     }),
  //   )
  // };
  //
// name,
// details,
// expirydate,
// qty,
// datebought: new Date().toLocaleDateString(),
// comments,
// foodgroupid
  };

  const NewItem = () => {
    //const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [date, setDate] = useState(new Date());
    
    const [formState, dispatch] = useReducer(formReducer, {
      inputs: {
        name: {
          value: '',
          isValid: false
        },
        details: {
          value: '',
          isValid: false
        },
        exprydate: {
            value: date,
            isValid: false
          },
          qty: {
            value: '',
            isValid: false
          },
          comments: {
            value: '',
            isValid: false
          },
          foodgroup: {
            value: '',
            isValid: false
          }

      },
      isValid: false
    });
  
    const inputHandler = useCallback((id, value, isValid) => {
      dispatch({
        type: 'INPUT_CHANGE',
        value: value,
        isValid: isValid,
        inputId: id
      });
    }, []);
  
    const handleChange = date => {
      setDate(date);
    };

    return (
      <form className="food-form" onSubmit={itemSubmitHandler}>
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
        <Input
          id="details"
          element="textarea"
          label="Details"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />

      <Datepicker
         id= "exprydate"
         element="select" 
         type="text" 
         label="Expiration Date" 
         validators={[VALIDATOR_REQUIRE()]}
         errorText="Please enter (mm/dd/yy)"
         onInput={inputHandler}/> 

         <Input
         id ="qty"
         element="input" 
         type="text" 
         label="Quantity" 
         validators={[VALIDATOR_REQUIRE()]} 
         errorText="Please enter a quantity"
         onInput={inputHandler}/>
         <Input
         id ="comments"
         element="textarea" 
         label="Comments" 
         validators={[VALIDATOR_REQUIRE()]} 
         errorText="Please enter a comment"
         onInput={inputHandler}/>
         <Select 
          id="foodgroup"
          element="select"
          label="Foodgroup"
          validators={[VALIDATOR_REQUIRE()]} 
          errorText="Please enter a foodgroup"
          onInput={inputHandler}>
        </Select> 

        <Button type="submit" disabled={!formState.isValid}>
          ADD ITEM
        </Button>
      </form>
    );
  };
  
  export default NewItem;
