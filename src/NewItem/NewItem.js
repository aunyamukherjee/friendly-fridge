import React, {useCallback, useReducer} from 'react';
import "./NewItem.css";
import Input from '../shared/FormElements/Input.js';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../shared/util/validators'
import Button from '../shared/FormElements/Button';

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
  
  const NewItem = () => {
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
            value: '',
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
  
    return (
      <form className="food-form">
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
        <Input
         id= "exprydate"
         element="input" 
         type="text" 
         label="Expiration Date" 
         validators={[VALIDATOR_MINLENGTH(7)]} 
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
        <Button type="submit" disabled={!formState.isValid}>
          ADD ITEM
        </Button>
      </form>
    );
  };
  
  export default NewItem;
