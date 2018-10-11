const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const api_routes = require('./routes/api_routes');
const passport_routes = require('./routes/passport_routes');
const passport = require('./modules/passport');
const session = require('express-session');
const port = process.env.PORT || 5000;
const { session_secret } = require('./config');
var db = require("./models");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: session_secret,
  resave: false,
  proxy: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

api_routes(app);
passport_routes(app);

app.listen(port, () => console.log(`Listening on port ${port}`));