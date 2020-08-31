import React from 'react';
import "./FoodForm.css";
import Input from '../shared/FormElements/Input.js';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../shared/util/validators'
import Button from '../shared/FormElements/Button';
import {useForm } from '../shared/hooks/form-hook';

  
  const NewItem = () => {
    const [formState, inputHandler] = useForm(
      {
        name: {
          value: '',
          isValid: false
        },
        details: {
          value: '',
          isValid: false
        },
        expirydate: {
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
        }
      },
      false
    );
  
  
    const foodSubmitHandler = event => {
      event.preventDefault();
      console.log(formState.inputs); //eventually link this with backend
    };

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
         id= "expirydate"
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
