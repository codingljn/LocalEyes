const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const { User } = require('../models');

passport.use(new Strategy({
  usernameField: 'email'
}, (email, password, cb) => {
  User.findOne({
    where: {email: email}
  }).then(user => {
    if ( !user ) return cb(null, false);

    if ( !user.validatePass(password, user.password)) return cb(null, false);

    return cb(null, user);
  }).catch(err => cb(err));
}));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => {
      cb(null, user);
    }).catch(err => cb(err));
});

module.exports = passport;