var mongoose = require('mongoose');
    User     = mongoose.model('User');

var UserServiceHandler = {

  get: function(next) {
    User.find({}, function(err, data) {
      next(err, data);
    });
  }

  create: function(params, next) {
    var user = new User(params);
    user.save(function(err, data) {
      next(err, data);
    });
  }
};

module.exports = UserServiceHandler;
