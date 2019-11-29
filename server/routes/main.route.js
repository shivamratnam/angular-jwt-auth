const route = require('express').Router();
const passport = require('passport');
const AuthController = require('../controllers/auth.controller');

route.post('/login', AuthController.login);
route.post('/signup', AuthController.signup);
route.post('/token', passport.authenticate('jwt', { session: false }), AuthController.validateToken);

module.exports = route;
