const route = require('express').Router();
const AuthController = require('../controllers/auth.controller');

route.post('/login', AuthController.login);
route.post('/signup', AuthController.signup);

module.exports = route;
