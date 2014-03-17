//Define variables & dependencies

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var controllers = require('./controller');

//Configure Express

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

//Define routes
app.get('/', controllers.index);

//Start the server
server.listen(3000, function() {
  console.log("Express server up and running on port 3000 - simple geolocation");
});