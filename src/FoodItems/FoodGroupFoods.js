import React from 'react';
import{ useParams} from 'react-router-dom';

import FoodsList from './FoodsList';

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
        foodgroupid:'5f43d1cca7812d8c3f87c2f6'
    }
];

const FoodGroupFoods = props => {
    const foodgroupid = useParams().foodgroupid;
    const loadedFoods = DUMMY_FOODS.filter(food => food.foodgroupid === foodgroupid);
    return <FoodsList items={loadedFoods} />;
};

export default FoodGroupFoods;