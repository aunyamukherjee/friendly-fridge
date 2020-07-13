
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');

const Foodgroup = require('../models/foodgroup');


const getAllFoodgroups = async (req, res, next) => {
    let foodgroup;
    try {
        foodgroup = await Foodgroup.find({});
    } catch (err) {
        const error = new HttpError (
            'Could not find any food groups', 500
        );
        return next(error);
    }
    if (foodgroup.length > 0) {
        res.type('application/json');
        res.send(foodgroup);
    } else {
        const error = new HttpError (
            'Could not find any food groups.', 404
        );
        return next(error);
 
    }

}

const createFoodgroup = async (req, res, next) => {
    const {name } = req.body;
    const createdFoodgroup =  new Foodgroup({
        name,
        foods: []
    });

    try {
        await createdFoodgroup.save();
    } catch (err) {
        const error = new HttpError (
            'Creating food group failed, please check your data.', 
            500
            );
            return next(error);
    }
    res.status(201).json({foodgroup: createdFoodgroup.toObject({ getters: true})});
};

exports.getAllFoodgroups = getAllFoodgroups;
exports.createFoodgroup = createFoodgroup;

  