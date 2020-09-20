import React, { useEffect, useState  } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useForm} from '../shared/hooks/form-hook';
import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import Card from '../shared/UIElements/Card';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../shared/util/validators';

import { useHttpClient } from '../shared/hooks/http-hook';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';
import ErrorModal from '../shared/UIElements/ErrorModal';

import '../NewItem/FoodForm.css';


const UpdateFood = () => {
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
         const responseData = await sendRequest(`http://localhost:5000/api/food/${foodid}`);
         setLoadedFood(responseData.food);
         setFormData(
            {
                name: {
                    value: responseData.food.name,
                    isValid: true
                },
                details: {
                    value: responseData.food.details,
                    isValid: true
                },
                expirydate: {
                    value: responseData.food.expirydate,
                    isValid: true
                },
                qty: {
                    value: responseData.food.qty,
                    isValid: true
                },
            },
            true
          );
        } catch (err) {}
        };
        fetchFood();
    }, [sendRequest, foodid, setFormData]);


    const foodUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
        await sendRequest(
            `http://localhost:5000/api/food/${foodid}`, 
            'PATCH',
            JSON.stringify({
                name: formState.inputs.name.value,
                details: formState.inputs.details.value,
                expirydate: formState.inputs.expirydate.value,
                qty: formState.inputs.qty.value,
            }), {
                'Content-type': 'application/json'

            }
            )
            history.push('/foods/'+foodid);
        } catch (err) {}

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
          initialValue={loadedFood.name}
         initialValid={true}/>
        <Input
          id="details"
          element="textarea"
          label="Details"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
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
         initialValue={loadedFood.qty}
         initialValid={true}/> 
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE ITEM
        </Button>


</form>}

</React.Fragment>);
};

export default UpdateFood;