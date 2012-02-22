var express = require('express');
var ejs = require('ejs');
var app = module.exports = express.createServer();

var pg = require('pg').native;
var connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/beardspotter'

var client = new pg.Client(connectionString);
client.connect();

app.set('view engine', 'ejs');

app.configure('development', function(){
  app.use(express.static(__dirname + '/public', { maxAge: 31557600000 })); /* One year */
  app.use(express.bodyParser());
});

app.get('/', function(req, res){
  res.render('index');
});

app.get('/sighting', function(req, res) {
  var query = client.query('SELECT * FROM sighting ORDER BY posted DESC LIMIT 20');
  var sightings = [];
  query.on('row', function(row) {
    row.beards = JSON.parse(row.beards);
    sightings.push(row);
  });
  query.on('end', function() {
    res.render('sighting', {
      locals: {
        sightings: sightings
      }
    });
  });
});

app.post('/sighting', function(req, res) {
  var location = null;
  var total = 0;

  for (var key in req.body.beard) {
    total += parseInt(req.body.beard[key]);
  }
  if (req.body.location && req.body.location.latitude && req.body.location.longitude) {
    location = req.body.location;
  }
  // TODO: Sanitize first.
  client.query('INSERT INTO sighting (ip, posted, latitude, longitude, beards) VALUES($1, $2, $3, $4, $5)', [req.connection.remoteAddress, new Date(), req.body.location.latitude, req.body.location.longitude, req.body.beard]);
  var query = client.query('SELECT * FROM sighting ORDER BY posted DESC LIMIT 20');
  var sightings = [];
  query.on('row', function(row) {
    row.beards = JSON.parse(row.beards);
    sightings.push(row);
  });
  query.on('end', function() {
    res.render('sighting', {
      locals: {
        total: total,
        location: location,
        sightings: sightings
      }
    });
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
