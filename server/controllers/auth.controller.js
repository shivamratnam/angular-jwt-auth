const passport = require('passport');
const jwt = require('jsonwebtoken');

const secretKey = 'MySecretKey' // dont store secret key inside code

exports.login = (req, res, next) => {
  let user = {
    name: 'Shivam',
    email: 'shivam@gmail.com',
    password: 'shivam123'
  }
  if(req.body.email == user.email && req.body.password == user.password){
    // Generate Token
    let token = jwt.sign(user, secretKey);
    res
    .header({ access_token: token, name: user.name, email: user.email })
    .send({
      success: true,
      message: 'User Validated successfully',
    });
  } else {
    res.status(401)
    .send({
      success: false,
      message: 'Invalid Username or Password',
    });
  }
  res.send('inside login controller');
}
exports.signup = (req, res) => {
  let user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  // Generate Token
  let token = jwt.sign(user, secretKey);
  res.status(200)
  .header({ access_token: token, name: user.name, email: user.email })
  .send({
    success: true,
    message: 'User Registered successfully',
  });


}
