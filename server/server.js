var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use('/', express.static('client'));
app.use(bodyParser.json());
app.get('/',function(req,res){
  res.sendFile('index.html',{root:__dir.name+'/../client'});
});
require('./middleware.js')(app,express);

var server = app.listen(process.env.PORT||5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('i am at http://%s:%s', host, port);

});

app.post('/api/idea', function (request, response){
  console.log(request.body);
  response.end();
});
