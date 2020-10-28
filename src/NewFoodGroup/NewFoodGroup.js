import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../shared/FormElements/Input.js';
import Button from '../shared/FormElements/Button';
import ErrorModal from '../shared/UIElements/ErrorModal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';

import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';
import { 
    VALIDATOR_REQUIRE, 
  } from '../shared/util/validators';
import '../NewItem/FoodForm.css';

const NewFoodGroup = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    
    const [formState, inputHandler] = useForm(
      {
        name: {
          value: '',
          isValid: false
        }
      },
      false
    );
  
    const history = useHistory();
    const foodgroupSubmitHandler = async event => {
       event.preventDefault();
      try {
        await sendRequest(
          'http://localhost:5000/api/foodgroups',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value
          }),
          {
            'Content-type': 'application/json',
            Authorization: 'Bearer '+ auth.token
        }
          
        );

        history.push('/');
        // Redirect the user to a different page
      } catch ( err) {};
  
    };

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
      <form className="food-form" onSubmit={foodgroupSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid foodgroup name."
          onInput={inputHandler}
        />
        
        <Button type="submit" disabled={!formState.isValid} >
       Add Foodgroup
        </Button>
      </form>
      </React.Fragment>
    );
  };
  

export default NewFoodGroup;