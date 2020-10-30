import React, { useEffect, useState, useContext  } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useForm} from '../shared/hooks/form-hook';
import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import Card from '../shared/UIElements/Card';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../shared/util/validators';
import { AuthContext } from '../shared/context/auth-context';

import { useHttpClient } from '../shared/hooks/http-hook';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';
import ErrorModal from '../shared/UIElements/ErrorModal';

import '../NewItem/FoodForm.css';
const axios = require('axios');


const UpdateFood = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError  } = useHttpClient();
    const [loadedFood, setLoadedFood ] = useState();


    const foodid = useParams().foodid;
    const history = useHistory();

    const [formState,inputHandler, setFormData] = useForm({
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
    },
    false);

    useEffect(() => {
        const fetchFood = async () => {
        try { 
                const fid = `${foodid}`;
                console.log("Starting axios call for fetchFood");
                const responseData = 
                // await axios.get('http://localhost:5000/api/food/'+`${foodid}`,
                await axios.get(process.env.REACT_APP_BACKEND_URL+'/food/'+`${foodid}`,
                
                    { headers: {
                    'Content-Type': 'application/json' , 
                    Authorization: 'Bearer '+ auth.token 
                    }}
                );
                console.log("responseData="+ JSON.stringify(responseData.data.food));
                setLoadedFood(responseData.data.food);
                console.log("setLoadedFood finished");
            } catch (err) {console.log("Error in axios");}
   };
   fetchFood();
   }, [auth.token, foodid, setFormData]);

    const foodUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {

                 const fid = `${foodid}`;
                 console.log("Starting axios call for foodUpdateSubmitHandler ");
                 const responseData = 
                //    await axios.patch('http://localhost:5000/api/food/'+`${foodid}`,
                await axios.patch(process.env.REACT_APP_BACKEND_URL+'/food/'+`${foodid}`,
                   
                   JSON.stringify({
                            name: formState.inputs.name.value,
                            details: formState.inputs.details.value,
                            expirydate: formState.inputs.expirydate.value,
                            qty: formState.inputs.qty.value,
                        }),
                     { headers: {
                     'Content-Type': 'application/json' , 
                     Authorization: 'Bearer '+ auth.token 
                     }}
                   );
                   console.log("responseData="+ JSON.stringify(responseData.data.food));
                   setLoadedFood(responseData.data.food);
                 console.log("setLoadedFood finished");
             } catch (err) {console.log("Error in axios");}
            history.push('/foods/'+foodid);
           };

        
    
    if (isLoading) {
        return (
            <div className='center'>
                <LoadingSpinner />
            </div>
        );
    }

    if (!loadedFood && !error) {
        return (
        <div className="center">
            <Card>
                <h2>Could not find food!</h2>
            </Card>
        </div>
        );
    }

 

    return ( 
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
       {!isLoading && loadedFood && <form className='food-form' onSubmit = {foodUpdateSubmitHandler}>
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
          onChange={inputHandler}
          onSelect={inputHandler}
          initialValue={loadedFood.name}
         initialValid={true}/>
        <Input
          id="details"
          element="textarea"
          label="Details"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
          onChange={inputHandler}
          onSelect={inputHandler}
          initialValue={loadedFood.details}
         initialValid={true}/>        
         <Input
         id= "expirydate"
         element="input" 
         type="text" 
         label="Expiration Date" 
         validators={[VALIDATOR_MINLENGTH(7)]} 
         errorText="Please enter (mm/dd/yy)"
         onInput={inputHandler}
         onChange={inputHandler}
         onSelect={inputHandler}
         initialValue={loadedFood.expirydate}
         initialValid={true}/> 
         <Input
         id ="qty"
         element="input" 
         type="text" 
         label="Quantity" 
         validators={[VALIDATOR_REQUIRE()]} 
         errorText="Please enter a quantity"
         onInput={inputHandler}
         onChange={inputHandler}
         onSelect={inputHandler}
         initialValue={loadedFood.qty}
         initialValid={true}/> 
        <Button type="submit" disabled={!formState.isValid}>
          Update
        </Button>


</form>}

</React.Fragment>);
};

export default UpdateFood;