import React, { useState, useContext } from 'react';
import Card from '../shared/UIElements/Card';
import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import ErrorModal from '../shared/UIElements/ErrorModal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';
import loginImg from "./logo.png";

import { 
    VALIDATOR_EMAIL, 
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from '../shared/util/validators';

import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';

import "./Auth.css";

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
    const [formState, inputHandler, setFormData] = useForm(
      {
        email: {
          value: '',
          isValid: false
        },
        password: {
          value: '',
          isValid: false
        }
      },
      false
    );
  
    const switchModeHandler = () => {
      if (!isLoginMode) {
        setFormData(
          {
            ...formState.inputs,
            name: undefined
          },
          formState.inputs.email.isValid && formState.inputs.password.isValid
        );
      } else {
        setFormData(
          {
            ...formState.inputs,
            name: {
              value: '',
              isValid: false
            }
          },
          false
        );
      }
      setIsLoginMode(prevMode => !prevMode);
    };
  
    const authSubmitHandler = async event => {
      event.preventDefault();
      
  
      if (isLoginMode) {
        try {
          const responseData = await sendRequest(
            // process.env.REACT_APP_BACKEND_LOGIN_URL,
            'http://localhost:5000/api/users/login',
            'POST',
            JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value
            }),
            {
              'Content-Type': 'application/json'
            }
          );
          auth.login(responseData.userId, responseData.token);
          console.log('responseData.userId:'+responseData.userId);
          console.log('responseData.token'+responseData.token);
        } catch (err) {}

      } else {
        try {
          const formData = new FormData();
          formData.append('name', formState.inputs.name.value);
          formData.append('email', formState.inputs.email.value);
          formData.append('password', formState.inputs.password.value);
//          formData.append('image', formState.inputs.image.value);
          const responseData = await sendRequest(
            'http://localhost:5000/api/users/signup',
            'POST',
            JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value
            }),
            {
              'Content-Type': 'application/json'
            }
          );
  
          auth.login(responseData.userId, responseData.token);
          console.log('responseData.userId:'+responseData.userId);
          console.log('responseData.token'+responseData.token);
        } catch (err) {}
      }
    };
  

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {/* {isLoading && <LoadingSpinner asOverlay />}  */}
        <div className="base-container" > 
          <div className="header"></div>
          <div className="content">
            <div className="image">
              <img src={loginImg} />
            </div>
          <form onSubmit={authSubmitHandler}>
            <div className="form">
              {!isLoginMode && ( 
                  <div className="form-group">
                  <label htmlFor="username"></label>
                    <Input 
                      element="input"
                      id="name"
                      type="text"
                      label="Name"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter a name."
                      onInput={inputHandler}
                    />
                  </div> //formgroup
              )}
                  <div className="form-group">
                  <label htmlFor="email"></label>
                    <Input 
                    element="input"
                    id="email"
                    type="email"
                    label="email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                    />
                  </div>  
                  <div className="form-group">
                  <label htmlFor="password"></label>
                    <Input 
                    element="input"
                    id="password"
                    type="password"
                    label="password"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid password, at least 5 characters."
                    onInput={inputHandler}
                    />
                  </div>  

                  <div className="footer">
                    <Button  className="btn" disabled={!formState.isValid}>
                      {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                    <Button type="button" inverse onClick={switchModeHandler}>
                      SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
                    </Button>
                  </div> 
            </div>
          </form>
      </div>
      </div>
      </React.Fragment>
    );
  };
  
  export default Auth;