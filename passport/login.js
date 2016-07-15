var LocalStrategy = require('passport-local').Strategy,
    bCrypt        = require('bcrypt-nodejs'),
    mongoose      = require('mongoose'),
    User          = mongoose.model('User');

var isValidPassword = function(user, password) {
  return bCrypt.compareSync(password, user.password);
};

module.exports = function(passport) {
  passport.use('login', 
    new LocalStrategy({passReqToCallback: true}, function(req, username, password, next) {
      User.findOne({'username': username}, function(err, user) {
        if(err) {
          return next(err);
        }
        if(!user) {
          console.log('Username does not exist: '+ username);
          return next(null, false, req.flash('message', 'user not found'));
        }
        if(!isValidPassword(user, password)) {
          console.log('Invalid Password');
          return next(null, false, req.flash('message', 'invalid password'));
        }
        return next(null, user);
      });
    })
  );
};
