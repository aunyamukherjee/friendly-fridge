import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {useForm} from '../shared/hooks/form-hook';
import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import Card from '../shared/UIElements/Card';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../shared/util/validators';
import '../NewItem/FoodForm.css';

const DUMMY_FOODS = [
    {
        id:'5f023dd42c651f6df1816997',
        name:'Cherries',
        details:'Bing Cherries',
        expirydate:'08/12/2020',
        qty:'6',
        comments:'Very yummy',
        foodgroupid:'u1'
    },
    {
        id:'5f023dd42c651f6df1816907',
        name:'Berries',
        details:'Black Berries',
        expirydate:'08/12/2020',
        qty:'5',
        comments:'Quite tart',
        foodgroupid:'u1'
    },
    {
        id:'345dgghh6',
        name:'Apples',
        details:'Gala',
        expirydate:'08/15/2020',
        qty:'5',
        comments:'Use these for Salad',
        foodgroupid:'u2'
    }
];

const UpdateFood = () => {
    const [isLoading, setIsLoading] = useState(true);
    const foodname = useParams().foodname;

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
        comments: {
            value: '',
            isValid: false
        },
    },
    false)

    const identifiedFood = DUMMY_FOODS.find(p => p.name === foodname);

    useEffect(() => {
        if (identifiedFood) {
          setFormData(
            {
                name: {
                    value: identifiedFood.name,
                    isValid: true
                },
                details: {
                    value: identifiedFood.details,
                    isValid: true
                },
                expirydate: {
                    value: identifiedFood.expirydate,
                    isValid: true
                },
                qty: {
                    value: identifiedFood.qty,
                    isValid: true
                },
                comments: {
                    value: identifiedFood.comments,
                    isValid: true
                },
            },
            true
          );
        }
        setIsLoading(false);
      }, [setFormData, identifiedFood]);

    const foodUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log('foodUpdateSubmitHandler:'+JSON.stringify(formState.inputs));
    };

    if (!identifiedFood) {
        return (
        <div className="center">
            <Card>
                <h2>Could not find food!</h2>
            </Card>
        </div>
        );
    }

    if (isLoading) {
        return (
            <div className='center'>
                <h2>Loading...</h2>
            </div>
        );
    }

    return ( <form className='food-form' onSubmit = {foodUpdateSubmitHandler}>
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
          initialValue={formState.inputs.name.value}
         initialValid={formState.inputs.name.isValid}/>
        <Input
          id="details"
          element="textarea"
          label="Details"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
          initialValue={formState.inputs.details.value}
          initialValid={formState.inputs.details.isValid}/>
        <Input
         id= "expirydate"
         element="input" 
         type="text" 
         label="Expiration Date" 
         validators={[VALIDATOR_MINLENGTH(7)]} 
         errorText="Please enter (mm/dd/yy)"
         onInput={inputHandler}
         initialValue={formState.inputs.expirydate.value}
         initialValid={formState.inputs.expirydate.isValid}/>
         <Input
         id ="qty"
         element="input" 
         type="text" 
         label="Quantity" 
         validators={[VALIDATOR_REQUIRE()]} 
         errorText="Please enter a quantity"
         onInput={inputHandler}
         initialValue={formState.inputs.qty.value}
         initialValid={formState.inputs.qty.isValid}/>
         <Input
         id ="comments"
         element="textarea" 
         label="Comments" 
         validators={[VALIDATOR_REQUIRE()]} 
         errorText="Please enter a comment"
         onInput={inputHandler}
         initialValue={formState.inputs.comments.value}
         initialValid={formState.inputs.comments.isValid}/>
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE ITEM
        </Button>


</form>);
};

export default UpdateFood;