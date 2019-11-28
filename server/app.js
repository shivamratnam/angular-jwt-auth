// Import Modules
const express = require('express');
const mongoose = require('mongoose');
const MainRoute = require('./routes/main.route');
const UserRoute = require('./routes/user.route');
const passport = require('passport');
const bodyParser = require('body-parser');
const DBConfig = require('./database/dbconfig');

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

// Connect to database
let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(DBConfig.DB_URI, options, (err) => {
  if(err){
    console.log(err);
  } else {
    console.log('Database Connected');
  }
});

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
