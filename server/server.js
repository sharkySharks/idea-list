var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/idealist');

app.use('/', express.static('client'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'idealist',
  resave: true,
  saveUninitialized: true
}));

require('./auth')(app);
require('./middleware')(app, express);
var updateUsers = require('./update-users');
updateUsers();

var server = app.listen(process.env.PORT || 5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Serving at port %s', port);
});
