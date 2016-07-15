var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  username: String,
  password: String,
  gender: String,
  address: String
});

module.exports = mongoose.model('User', UserSchema);
