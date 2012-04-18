var pg = require('pg').native;
var connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/beardspotter'

var client = new pg.Client(connectionString);
client.connect();

client.query("drop table sighting").on('end', function(){
  client.query("create table sighting(id serial, ip character varying, posted timestamp without time zone, nickname character varying, placename character varying, latitude character varying, longitude character varying, beards character varying)").on('end', function(){
    console.log('Created sighting table.')
    client.end();
  });
});
