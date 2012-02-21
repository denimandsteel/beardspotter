var pg = require('pg').native;
var connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/beardspotter'

var client = new pg.Client(connectionString);
client.connect();

client.query("CREATE TABLE...;", function(err, result) {
});

client.query("CREATE TABLE...;", function(err, result) {
});
