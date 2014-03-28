// import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// model creation
var LocationModel = function() {
  var LocationSchema = new Schema({
    name: String,
    loc: {
      type: [Number],
      index: '2d'
    }
  });

  mongoose.model('Location', LocationSchema);
};

// create an export function to encapsulate the model creation
module.exports = LocationModel;