var mongoose = require('mongoose');
var Location = mongoose.model('Location');

// create an export function to encapsulate the controller's methods
module.exports = {
  index: function(req, res, next) {
    res.json(200, {
      status: 'Location API is running.',
      methods: {
        add: 'Add a new location: POST -> /api/locations',
        find: 'Find a location: GET -> /api/locations
      }
    });
  },
  addLocation: function(req, res, next) {
    // add a new location
  },
  findLocation: function(req, res, next) {
    var coords = [];
    coords[0] = req.query.longitude;
    coords[1] = req.query.latitude;

    Location.find({
      loc: {
        $near: coords
      }
    }).limit(10).exec(function(err, locations) {
      console.log(err, locations);
    });
  }
};