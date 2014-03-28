var mongoose = require('mongoose');
var Location = mongoose.model('Location');

// create an export function to encapsulate the controller's methods
module.exports = {
  index: function(req, res, next) {
    res.json(200, {
      status: 'Location API is running.',
    });
  },
  findLocation: function(req, res, next) {
    var limit = req.query.limit || 10;

    // get the max distance or set it to 800 meters
    var maxDistance = req.query.distance || 8;

    // we need to convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6371;

    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = req.query.longitude;
    coords[1] = req.query.latitude;

    // find a location
    Location.find({
      loc: {
        $near: coords,
        $maxDistance: maxDistance
      }
    }).limit(limit).exec(function(err, locations) {
      if (err) {
        return res.json(500, err);
      }

      res.json(200, locations);
    });
  }
};