import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


import Input from '../shared/FormElements/Input.js';
import Select from '../shared/FormElements/Select';
import Button from '../shared/FormElements/Button';
import Datepicker from '../shared/FormElements/Datepicker';
import ErrorModal from '../shared/UIElements/ErrorModal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';

import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';
import './NewItem.css';
import "react-datepicker/dist/react-datepicker.css";

import { 
  VALIDATOR_REQUIRE, 
  VALIDATOR_MINLENGTH
} from '../shared/util/validators';
import Auth from '../Auth/index.js';

  const NewItem = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    const foodgroupid = useSelector(state => state.foodgroupid);
    const expiryDate = useSelector(state => state.expirydate);
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
            expirydate: '',
            isValid: false
        },
        qty: {
            value: '',
            isValid: false
        },
        foodgroupid: {
            value: '',
            selected: '',
            foodgroupid: '',
            isValid: false
        }

      },
      false
    );
  
    const history = useHistory();


    const itemSubmitHandler = async event => {
       event.preventDefault();

      try {
        const formData = new FormData();
        formData.append('name', formState.inputs.name.value);
        formData.append('details', formState.inputs.details.value);
        formData.append('expirydate', expiryDate);
        formData.append('qty', formState.inputs.qty.value);
        formData.append('foodgroupid', foodgroupid);
        console.log('NewItem:itemSubmitHandler:name='+formState.inputs.name.value);
        console.log('NewItem:itemSubmitHandler:details='+formState.inputs.details.value);
        console.log('NewItem:itemSubmitHandler:expirydate='+expiryDate);
        console.log('NewItem:itemSubmitHandler:qty='+formState.inputs.qty.value);
        console.log('NewItem:itemSubmitHandler:foodgroupid='+foodgroupid);
        await sendRequest(
          process.env.REACT_APP_BACKEND_URL+'/food',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            details: formState.inputs.details.value,
            expirydate: expiryDate,
            qty: formState.inputs.qty.value,
            foodgroupid: foodgroupid
          }),
          //formData,
          { 
            'Content-Type': 'application/json' , 
             Authorization: 'Bearer '+ auth.token 
          }
        );

        history.push(`/${foodgroupid}/food`);
        // Redirect the user to a different page
      } catch (err) {};
  
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

        <Datepicker
         id= "expirydate"
         element="input" 
         type="text" 
         label="Expiration Date" 
         validators={[VALIDATOR_MINLENGTH(7)]}
         errorText="Please enter (mm/dd/yy)"
         onInput={inputHandler}
         onChange={inputHandler}
         onSelect={inputHandler}
         />   

         <Input
         id ="qty"
         element="input" 
         type="text" 
         label="Quantity" 
         validators={[VALIDATOR_REQUIRE()]} 
         errorText="Please enter a quantity"
         onInput={inputHandler}/>

         <Select 
          id="foodgroupid"
          element="select"
          label="Foodgroup"
          errorText="Please enter a foodgroup"
          onTouch={inputHandler}/>

        <Button type="submit" disabled={formState.isValid} >
        ADD ITEM
        </Button>

      </form>
      </React.Fragment>
    );
  };
  
  export default NewItem;
