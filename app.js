// Define variables & dependencies

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');
var async = require('async');
var location = require('./location')();
var controllers = require('./controller');
var Location = mongoose.model('Location');
var fs = require('fs');
var path = require('path');

// Bootstrap mongoose and load dummy data
mongoose.connect('mongodb://localhost/geospatial_db', function(err) {
  if (err) throw err;

  // load data from file and transform it to Object
  var data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

  // clean db and load new data
  Location.remove(function() {
    async.each(data, function(item, callback) {
      // create a new location
      Location.create(item, callback);
    }, function(err) {
      if (err) throw err;
    });
  });

});

// Configure Express

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use('/images', express.static(__dirname + '/writable'));
  app.use(app.router);
  app.engine('html', require('ejs').renderFile);
});

// Define routes
app.get('/', controllers.index);
app.get('/api/locations', controllers.findLocation);

// Start the server
server.listen(3000, function() {
  console.log("Express server up and running on port 3000 - simple geolocation");
});