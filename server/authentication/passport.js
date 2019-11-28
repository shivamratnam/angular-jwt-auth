
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = (passport) => {
  let options = {
    jwtFromRequest: ExtractJwt.fromBodyField('token'),
    secretOrKey: 'MySecret'
  }
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    let user = {
      _id: 'abcd123',
      name: 'Shivam',
      email: 'shivam@gmail.com',
      password: 'shivam123'
    }
    console.log('inside stratigy');
    done(null, user);
  }));
}
