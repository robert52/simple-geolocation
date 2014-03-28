// import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// model creation

var LocationModel = function() {
  var LocationSchema = new Schema({
    name: String,
    loc: {
      type: [Number],   // format will be [ <longitude> , <latitude> ]
      index: '2d'       // create the geospatial index
    }
  });


  // register the mongoose model
  mongoose.model('Location', LocationSchema);
};

// create an export function to encapsulate the model creation
module.exports = LocationModel;