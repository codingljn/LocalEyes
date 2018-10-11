const { User } = require('../models');
const passport = require('../modules/passport');

module.exports = app => {
  app.get('/auth/isauth', (req, res) => {
    if ( !req.user )
      res.send({success: 0});
    else res.send({success: 1, user: req.user});
  });

  app.post('/auth/register', (req, res) => {
    User.create(req.body)
      .then(user => {
        req.login(user, (err) => {
          if ( err ) return res.send({success: 0, message: err});

          res.send({ user: req.user, success: 1 });
        });
        
      }).catch(err => res.send({success: 0, message: 'These credentials are already in our system. Please try something original this time'}));
  });

  app.post('/auth/login', (req, res) => {
    passport.authenticate('local')(req, res, result => {
      res.send({ user: req.user, success: 1 });
    });
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.send({success: 1, message: 'Logged out successfully!'});
  })
}