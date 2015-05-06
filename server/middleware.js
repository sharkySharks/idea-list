var bodyParser = require('body-parser');
 // var morgan = require('morgan');

module.exports = function(app, express){
  var ideas = express.Router();
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  require('./ideas/idea-routes.js')(app);
};