
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/user.model');


module.exports = (passport) => {
  let options = {
    jwtFromRequest: ExtractJwt.fromHeader('access_token'),
    secretOrKey: 'MySecretKey'
  }
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    let findQuery = {
      email: jwtPayload.email,
      password: jwtPayload.password
    }
    UserModel.findOne(findQuery, (err, user) => {
      if(err) {
        done(err);
      }
      if(user){
        done(null, user);
      } else {
        done(null, false, {errMsg: 'Invalid Token'});
      }
    });
  }));
}
