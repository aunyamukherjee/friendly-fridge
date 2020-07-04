const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Place = require('../models/place');
const User = require('../models/user');

let DUMMY_FOODGROUP = [{
    id: 'fg1',
    name: 'Drinks',
    foodid: 'f1'
},
{
    id: 'fg2',
    name: 'Carbs',
    foodid: 'f2'
},{
    id: 'fg3',
    name: 'Fruits & Vegetables',
    foodid: 'f3'
},{
    id: 'fg4',
    name: 'Dairy',
    foodid: 'f4'
},{
    id: 'fg5',
    name: 'Meat, Fish & Eggs',
    foodid: 'f5'
},{
    id: 'fg6',
    name: 'Fats',
    foodid: 'f6'
},{
    id: 'fg7',
    name: 'High Sugar Foods',
    foodid: 'f7'
},
];

const getFoodGroup = (req,res, next) => {
    const foodgroups = DUMMY_FOODGROUP;
    res.json({ foodgroups });
}

// const getFoodsByFoodGroupId = (req, res, next)=> {
//     const fgId = req.params.fgid;
//     const foods = DUMMY_FOOD.filter(p => {
//         return p.foodgroupid === fgId;
//     });
//     if (!foods || foods.length === 0) {
//         return next(new HttpError('Could not find a food for the provided foodgroup id.', 404)
//         );
//     }

//     res.json({foods});  
// }


// const createFood = (req, res, next) => {
//     const {name, details, expirydate, qty, comments, foodgroupid } = req.body;
//     const createdFood = {
//         id: uuid(),
//         name,
//         details,
//         expirydate,
//         qty,
//         datebought: new Date().toLocaleDateString(),
//         comments,
//         foodgroupid
//     };
//     DUMMY_FOOD.push(createdFood);
//     res.status(201).json({food: createdFood});
// };
// const createPlace = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError('Invalid inputs passed, please check your data.', 422)
//     );
//   }

//   const { title, description, address, creator } = req.body;

//   let coordinates;
//   try {
//     coordinates = await getCoordsForAddress(address);
//   } catch (error) {
//     return next(error);
//   }

//   const createdPlace = new Place({
//     title,
//     description,
//     address,
//     location: coordinates,
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
//     creator
//   });

//   let user;
//   try {
//     user = await User.findById(creator);
//   } catch (err) {
//     const error = new HttpError('Creating place failed, please try again', 500);
//     return next(error);
//   }

//   if (!user) {
//     const error = new HttpError('Could not find user for provided id', 404);
//     return next(error);
//   }

//   console.log(user);

//   try {
//     const sess = await mongoose.startSession();
//     sess.startTransaction();
//     await createdPlace.save({ session: sess });
//     user.places.push(createdPlace);
//     await user.save({ session: sess });
//     await sess.commitTransaction();
//   } catch (err) {
//     const error = new HttpError(
//       'Creating place failed, please try again.',
//       500
//     );
//     return next(error);
//   }

//   res.status(201).json({ place: createdPlace });
// };

// const updateFood = async (req, res, next) => {
//   // const errors = validationResult(req);
//   // if (!errors.isEmpty()) {
//   //   return next(
//   //     new HttpError('Invalid inputs passed, please check your data.', 422)
//   //   );
//   // }

//   const {name, details, qty, comments } = req.body;
//   const foodId = req.params.fid;

//   const updatedFood = { ...DUMMY_FOOD.find(p => p.id === foodId) };
//   const foodIndex = DUMMY_FOOD.findIndex(p => p.id === foodId);
//   updatedFood.name = name;
//   updatedFood.details = details;
//   updatedFood.qty = qty;
//   updatedFood.comments = comments;
//   DUMMY_FOOD[foodIndex] = updatedFood;

//   res.status(200).json({food: updatedFood});
  
  
  // let place;
  // try {
  //   place = await Place.findById(placeId);
  // } catch (err) {
  //   const error = new HttpError(
  //     'Something went wrong, could not update place.',
  //     500
  //   );
  //   return next(error);
  // }

  // place.title = title;
  // place.description = description;

  // try {
  //   await place.save();
  // } catch (err) {
  //   const error = new HttpError(
  //     'Something went wrong, could not update place.',
  //     500
  //   );
  //   return next(error);
  // }

  // res.status(200).json({ place: place.toObject({ getters: true }) });
//};

// const deleteFood = async (req, res, next) => {
//   const foodId = req.params.pid;
//   DUMMY_FOOD = DUMMY_FOOD.filter(p => p.id !== foodId);
//   res.status(200).json({ message: 'Deleted food.' });
  // let place;
  // try {
  //   place = await Place.findById(placeId).populate('creator');
  // } catch (err) {
  //   const error = new HttpError(
  //     'Something went wrong, could not delete place.',
  //     500
  //   );
  //   return next(error);
  // }

  // if (!place) {
  //   const error = new HttpError('Could not find place for this id.', 404);
  //   return next(error);
  // }

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await place.remove({ session: sess });
  //   place.creator.places.pull(place);
  //   await place.creator.save({ session: sess });
  //   await sess.commitTransaction();
  // } catch (err) {
  //   const error = new HttpError(
  //     'Something went wrong, could not delete place.',
  //     500
  //   );
  //   return next(error);
  // }

//   res.status(200).json({ message: 'Deleted place.' });
// };

exports.getFoodGroup = getFoodGroup;

  