const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.model');

const secretKey = 'MySecretKey' // dont store secret key inside code
const salRound = 11;

exports.login = (req, res, next) => {
  let findQuery = {
    email: req.body.email
  }
  UserModel.findOne(findQuery, (err, user) => {
    if(err) throw err;

    if(user){
      bcrypt.compare(req.body.password, user.password, (err, success) => {
        if(err) throw err;

        if(success){
          // Generate Token
          let userPayload = {
            name: user.name,
            email: user.email,
            password: user.password
          }
          let token = jwt.sign(userPayload, secretKey);
          res.status(200)
          .header({ access_token: token, name: user.name, email: user.email })
          .send({
            success: true,
            message: 'User Validated successfully',
          });
        } else {
          res.status(401)
          .send({
            success: false,
            message: 'Invalid Password',
          });
        }
      });
    } else {
      res.status(401)
      .send({
        success: false,
        message: 'Invalid Email',
      });
    }
  }); // end user model
}
exports.signup = (req, res) => {
  // Check is email exist
  UserModel.findOne({email: req.body.email}, (err, user) => {
    if(user){
      res.status(409)
      .send({
        success: false,
        message: 'Email already exist',
      });
    } else {
      // Encrypt Password
      bcrypt.genSalt(salRound, (err, salt) => {
        if(err) throw err;

        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if(err) throw err;

          let createQuery = {
            name: req.body.name,
            email: req.body.email,
            password: hash
          }
          // Store user info in database
          UserModel.create(createQuery, (err, result) => {
            if(err) throw err;

            // Generate Token
            let userPayload = {
              name: req.body.name,
              email: req.body.email,
              password: hash
            }
            let token = jwt.sign(userPayload, secretKey);
            let headerPayload = {
              name: req.body.name,
              email: req.body.email,
              access_token: token
            }
            res.status(200)
            .header(headerPayload)
            .send({
              success: true,
              message: 'User Registered successfully',
            });
          }); // user model
        }); // end hash
      });
    }
  });
}
exports.validateToken = (req, res) => {
  if(req.user){
    res.send({success: true, message: 'User validated successfully'});
  } else {
    res.send({success: false, message: 'Invalid Token'});
  }
}
