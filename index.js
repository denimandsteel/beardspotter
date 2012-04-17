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
    // Dirty way to make sure we don't get empty rows.
    // Should clean this up on input.
    for (var i in row.beards) {
      if (row.beards.hasOwnProperty(i) && row.beards[i] > 0) {
        sightings.push(row);
        break;
      }
    }
  });
  query.on('end', function() {
    var humanReadable = {
      'old-goat': 'Old Goat',
      'full': 'Full',
      'van-dyke': 'Van Dyke',
      'van-winkle': 'Van Winkle',
      'goatee': 'Goatee',
      'chops': 'Chops',
      'dapper': 'Dapper',
      'chin-strap': 'Chin Strap',
      'dad': 'Dad'
    };
    res.render('sighting', {
      locals: {
        sightings: sightings,
        humanReadable: humanReadable
      }
    });
  });
});

app.post('/sighting', function(req, res) {
  var location = null;
  var total = 0;
  var accepted = [
    'old-goat',
    'full',
    'van-dyke',
    'van-winkle',
    'goatee',
    'chops',
    'dapper',
    'chin-strap',
    'dad'
  ];
  var beards = {};

  for (var key in req.body.beard) {
    console.log(accepted.indexOf(key) + ': ' + req.body.beard[key]);
    if (accepted.indexOf(key) >= 0 && parseInt(req.body.beard[key]) > 0) {
      total += parseInt(req.body.beard[key]);
      beards[key] = parseInt(req.body.beard[key]);
    }
  }
  if (req.body.location && req.body.location.latitude && req.body.location.longitude) {
    location = req.body.location;
  }
  if (total > 0) {
    // TODO: Sanitize first.
    client.query('INSERT INTO sighting (ip, posted, latitude, longitude, beards) VALUES($1, $2, $3, $4, $5)', [req.connection.remoteAddress, new Date(), req.body.location.latitude, req.body.location.longitude, beards]);
  }
  var query = client.query('SELECT * FROM sighting ORDER BY posted DESC LIMIT 20');
  var sightings = [];
  query.on('row', function(row) {
    row.beards = JSON.parse(row.beards);
    // Dirty way to make sure we don't get empty rows.
    // Should clean this up on input.
    for (var i in row.beards) {
      if (row.beards.hasOwnProperty(i) && row.beards[i] > 0) {
        sightings.push(row);
        break;
      }
    }
  });
  query.on('end', function() {
    var humanReadable = {
      'old-goat': 'Old Goat',
      'full': 'Full',
      'van-dyke': 'Van Dyke',
      'van-winkle': 'Van Winkle',
      'goatee': 'Goatee',
      'chops': 'Chops',
      'dapper': 'Dapper',
      'chin-strap': 'Chin Strap',
      'dad': 'Dad'
    };
    res.render('sighting', {
      locals: {
        total: total,
        location: location,
        sightings: sightings,
        humanReadable: humanReadable
      }
    });
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
