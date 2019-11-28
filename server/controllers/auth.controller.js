const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  console.log(req.body);
  res.send('inside login controller');
}
exports.signup = (req, res) => {
  let secret = "MySecret";
  let user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  // Generate Token
  let token = jwt.sign(user, secret);
  res.send({
    status: 'success',
    message: 'User Registered successfully',
    access_token: token
  });


}
