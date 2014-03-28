// Define variables & dependencies

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');
var async = require('async');
var controllers = require('./controller');
var Location = mongoose.model('Location');

var dummyData = [
  { name: 'Location 1', loc: [0, 0] },
  { name: 'Location 2', loc: [1, 1] },
  { name: 'Location 3', loc: [2, 2] },
  { name: 'Location 4', loc: [3, 3] },
  { name: 'Location 5', loc: [4, 5] },
  { name: 'Location 6', loc: [6, 6] },
  { name: 'Location 7', loc: [7, 7] },
  { name: 'Location 8', loc: [8, 8] }
];

// Bootstrap mongoose and load dummy data
mongoose.connect('mongodb://localhost/geospatial', function(err) {
  if (err) throw err;

  Location.remove(function() {
    async.each(dummyData, function(item, callback) {
      Location.create(item, callback);
    }, function(err) {});
  });

});

// Configure Express

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

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

// Start the server
server.listen(3000, function() {
  console.log("Express server up and running on port 3000 - simple geolocation");
});