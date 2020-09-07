import React from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../shared/FormElements/Input.js';
import Select from '../shared/FormElements/Select.js';
import Button from '../shared/FormElements/Button';
//import Datepicker from '../shared/FormElements/Datepicker';
import ErrorModal from '../shared/UIElements/ErrorModal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';

import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import './NewItem.css';
import "react-datepicker/dist/react-datepicker.css";

import { 
  VALIDATOR_REQUIRE, 
  VALIDATOR_MINLENGTH
} from '../shared/util/validators';

  const NewItem = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
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
            isValid: true
        },
        qty: {
            value: '',
            isValid: false
        },
        comments: {
            value: '',
            isValid: false
        },
        foodgroupid: {
            value: '',
            isValid: true
        }

      },
      false
    );
  
    const history = useHistory();
    const itemSubmitHandler = async event => {
       event.preventDefault();
      try {
        await sendRequest(
          'http://localhost:5000/api/food',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            details: formState.inputs.details.value,
            expirydate: formState.inputs.expirydate.value,
            qty: formState.inputs.qty.value,
            comments: formState.inputs.comments.value,
            foodgroupid: formState.inputs.foodgroupid.value
          }),
          { 'Content-Type': 'application/json'}
        );

        history.push('/');
        // Redirect the user to a different page
      } catch ( err) {};
  
    };

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
      <form className="food-form" onSubmit={itemSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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

        {/* <Datepicker
         id= "expirydate"
         element="input" 
         type="text" 
         label="Expiration Date" 
         validators={[VALIDATOR_MINLENGTH(7)]}
         errorText="Please enter (mm/dd/yy)"
         onInput={inputHandler}/>   */}

        <Input
         id= "expirydate"
         element="input"
         type="text"
         label="Expiration Date"
         validators={[VALIDATOR_MINLENGTH(7)]}
         errorText="Please enter (mm/dd/yy)"
         onInput={inputHandler} /> 

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
          id="foodgroupid"
          element="select"
          label="Foodgroup"
           validators={[VALIDATOR_REQUIRE()]} 
          errorText="Please enter a foodgroup"
          onInput={inputHandler}>
        </Select> 

        <Button type="submit" disabled={!formState.isValid} >
        ADD ITEM
        </Button>
      </form>
      </React.Fragment>
    );
  };
  
  export default NewItem;
