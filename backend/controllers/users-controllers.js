const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
  console.log('req.body='+ req.body);
  console.log('name, email, password='+ name + ''+ email + ''+ password);
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

    let hashedPassword;
    try {
      hashedPassword  = await bcrypt.hash(password, 12);
      console.log('hashedPassword='+ hashedPassword);
    } catch (err) {
      const error = new HttpError (
        'Could not create user, please try again.',
        500
      );
      return next(error);
    }
  const createdUser =  new User ({
    name,
    email,
    password: hashedPassword,
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

  let token;
  try {
    token = jwt.sign(
      {userId: createdUser.id, email: createdUser.email}, 
      'supersecret_dontshare', 
      {expiresIn: '1h'}
      );  
  } catch (err) {
    const error = new HttpError(
      'Signing up failed.  Please try again!',
      500
    );
    return next(error);

  }

  res.status(201).json( { userId: createdUser.id, email: createdUser.email, token: token });
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



  if (!existingUser) {
      const error = new HttpError(
      'Invalid ceredentials, could not log you in.',
      401
    );
    return next(error);
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  }  catch(err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.', 
      500);
      return next(error);
  }

    if (!isValidPassword) {
      const error = new HttpError(
        'Could not log you in, please check your credentials and try again.', 
        500);
        return next(error);
    }
    let token;
    try {
      token = jwt.sign(
        {userId: existingUser.id, email: existingUser.email}, 
        'supersecret_dontshare', 
        {expiresIn: '1h'}
        );  
    } catch (err) {
      const error = new HttpError(
        'Login failed.  Please try again!',
        500
      );
      return next(error);
  
    }
  

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
