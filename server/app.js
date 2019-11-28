// Import Modules
const express = require('express');
const MainRoute = require('./routes/main.route');
const UserRoute = require('./routes/user.route');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./authentication/passport')(passport);

// Init App
const app = express();

// Passport Initialize
app.use(passport.initialize());
app.use(passport.session());

// Config Body Parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Routes
app.use('/', MainRoute);
app.use('/user', UserRoute);

// Starting point of the application
( ()=> {
  let port = process.env.PORT || 8080;
  app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Server Started at http://localhost:${port}`);
  });
})();
