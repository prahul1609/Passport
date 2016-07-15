var LocalStrategy = require('passport-local').Strategy,
    bCrypt        = require('bcrypt-nodejs'),
    mongoose      = require('mongoose'),
    User          = mongoose.model('User');

var createHashEncryption = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = function(passport) {
  passport.use('register', 
    new LocalStrategy({passReqToCallback: true}, function(req, username, password, next) {
      User.findOne({username: username}, function(err, user) {
        if(err) {
          return next(err);
        }
        if(user) {
          console.log('user already exists');
          return next(null, false, {'message': 'User Already Exists'});
        } else {
          req.body.password = createHashEncryption(req.body.password);
          var newUser = new User(req.body);
          newUser.save(function(err, data) {
            if(err)
              return next(err);
            return next(null, data);
          });
        }
      });
    })
  );
};
