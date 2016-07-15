var UserServiceHandler = require('../services/user_service.js');

var UserController = {

  get: function(req, res) {
    UserService.get(function(err, data){
      console.log('Data received from DB:' , data);
    });
  }

  create: function(req, res) {
    UserService.create(function(err, data) {
      console.log('User created', data);
    });
  }
};

module.exports = UserController;
