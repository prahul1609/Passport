var login     = require('./login'),
    register  = require('./register'),
    mongoose  = require('mongoose'),
    User      = mongoose.model('User');


module.exports = function(passport) {

  //using serialize and deserialize for persisting login sessions.

  //storing _id property of user to session
  passport.serializeUser(function(user, done) {
    console.log('serializing user', user);
    done(null, user._id);
  });

  //using id to retrieve user from DB or memory (like incase of redis)
  passport.deserializeUser(function(id, done) {
    User.findOne({_id: id}, function(err, user) {
      console.log('deserializing user:', user);
      done(err, user);
    });
  });

  login(passport);
  register(passport);
};
