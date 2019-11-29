const route = require('express').Router();
const passport = require('passport');
const UserController = require('../controllers/user.controller');

route.post('/dashboard', passport.authenticate('jwt', { session: false }), UserController.dashboard);
route.post('/profile', UserController.profile);

module.exports = route;
