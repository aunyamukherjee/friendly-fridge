const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const User = require('../models/user');


const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({users: users.map(user => user.toObject( { getters: true }))});
};



const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next (
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }
  const { name, email, password } = req.body;
  console.log(req.body);
  console.log(name, email, password);
  let existingUser;
  try {
    existingUser = await User.findOne( { email: email } );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed. Please try again later.',
      500
    );
    return next(error);
  }

    if (existingUser) {
      const error = new HttpError(
        'User exists already. Please login instead.',
        422
      );
      return next(error);
    }

  const createdUser =  new User ({
    name,
    email,
    password,
    image: 'https://cdn5.vectorstock.com/i/thumb-large/99/94/default-avatar-placeholder-profile-icon-male-vector-23889994.jpg'
  })

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed.  Please try again!',
      500
    );
    return next(error);
  }
  res.status(201).json( { user: createdUser.toObject ({ getters: true })});
};

const login = async (req, res, next) => {
  const {email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne( { email: email } );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed. Please try again later.',
      500
    );
    return next(error);
  }
  if (!existingUser || existingUser.password !== password) {
      const error = new HttpError(
      'Invalid ceredentials, could not log you in.',
      401
    );
    return next(error);

  }

  res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
