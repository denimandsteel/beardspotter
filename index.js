var express = require('express');
var expressHogan = require('express-hogan.js');
var app = module.exports = express.createServer();

var pg = require('pg').native;
var connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/beardspotter'

//var client = new pg.Client(connectionString);
//client.connect();

// or connect on demand, client.connect(function(client...){ .. client.query(->); });

app.register('.html', expressHogan);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.configure('development', function(){
  app.use(express.static(__dirname + '/public', { maxAge: 31557600000 })); /* One year */
  app.use(express.bodyParser());
});

app.get('/', function(req, res){
  res.render('index');
});

app.get('/sighting', function(req, res) {
  returnSighting(req, res);
});

app.post('/sighting', function(req, res) {
  // Take care of post, redirect to get.
  returnSighting(req, res);
});

var returnSighting = function(req, res) {
  var location = null;
  var total = 0;

  for (var key in req.body.beard) {
    total += parseInt(req.body.beard[key]);
  }
  if (req.body.location && req.body.location.latitude && req.body.location.longitude) {
    location = req.body.location;
   }
  res.render('sighting', {
    locals: {
      total: total,
      location: location
    }
  });
}

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
