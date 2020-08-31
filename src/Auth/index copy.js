import React, { useState, useContext } from 'react';
import Card from '../shared/UIElements/Card';
import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import ErrorModal from '../shared/UIElements/ErrorModal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';

import { 
    VALIDATOR_EMAIL, 
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from '../shared/util/validators';

import { useForm } from '../shared/hooks/form-hook';
import { AuthContext } from '../shared/context/auth-context';

import "./Auth.css";

const Auth = () => {

    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, inputHandler, setFormData] = useForm ( {
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

 const authSubmitHandler = async event => 
 {
        event.preventDefault();
        setIsLoading(true);
        if (isLoginMode) {
            try {

                    const response = await fetch
                    (
                        'http://localhost:5000/api/users/login', 
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body:  JSON.stringify({
                            email: formState.inputs.email.value,
                            password: formState.inputs.password.value
                            })
                        }
                    );
                    const responseData = await response.json();
                    console.log('response ok = '+response.ok + " " + responseData.message);
                    if (!response.ok) {
                        throw new Error(responseData.message);
                    }
                    setIsLoading(false);
                    auth.login();
                } catch (err) 
                {
                    setIsLoading(false);
                    setError(err.message || 'Something went wrong, please try again.');
                }  
        } else {
            try {
                const response = await fetch
                (
                    'http://localhost:5000/api/users/signup', 
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:  JSON.stringify({
                            name: formState.inputs.name.value,
                            email: formState.inputs.email.value,
                            password: formState.inputs.password.value
                        })
                    }
                );
                    const responseData = await response.json();
                    if (!response.ok) {
                        throw new Error(responseData.message);
                    }
                    setIsLoading(false);
                    auth.login();
            } catch (err) 
            {
                    setIsLoading(false);
                    setError(err.message || 'Something went wrong, please try again.');

            }
        }
     setIsLoading(false);
 }  
 
 const switchModeHandler = event => {
    if (!isLoginMode) {
        setFormData(
            {
                ...formState.inputs,
                name: undefined
            }, 
            formState.inputs.email.isValid && formState.inputs.password.isValid);
    } else {
        setFormData(
            {
            ...formState.inputs,
            name: {
                value: '',
                isValid: false
            }
        }, 
        false);
    }
    setIsLoginMode(prevMode => !prevMode);
}  

const errorHandler = props => 
{
    setError(null);
    // };
    return 
    (
        <React.Fragment>
            (
            <ErrorModal error={error} onClear={errorHandler}/>
                <Card className="authentication">
                    {isLoading && <LoadingSpinner asOverlay/>}
                    <h3>Login Required</h3>
                    <hr />
                        <form onSubmit={authSubmitHandler}>
                            {!isLoginMode && (
                            <Input 
                                element="input"
                                id="name"
                                type="text"
                                label="Your Name"
                                validators={[VALIDATOR_REQUIRE]}
                                errorText="Please enter a name."
                                onInput={inputHandler}
                            />
                            )}
                            <Input 
                                element="input" 
                                id="email" 
                                type="email" 
                                label="E-Mail" 
                                validators={[VALIDATOR_EMAIL()]} 
                                errorText="Please enter a valid email address."
                                onInput={inputHandler}
                                />
                            <Input 
                                element="input" 
                                id="password" 
                                type="password" 
                                label="Password" 
                                validators={[VALIDATOR_MINLENGTH(5)]} 
                                errorText="Please enter a valid password with atleast 5 characters."
                                onInput={inputHandler}
                                />  
                            <Button type="submit" disabled={!formState.isValid}>
                                {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                            </Button>     
                        </form>
                        <Button inverse onClick={switchModeHandler}>
                            SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
                        </Button>
            </Card>
    )
    </React.Fragment>
    );
};
}

export default Auth;