var express = require('express');
var expressHogan = require('express-hogan.js');
var app = module.exports = express.createServer();

app.register('.html', expressHogan);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.configure('development', function(){
  app.use(express.static(__dirname + '/public', { maxAge: 31557600000 })); /* One year */
});

app.get('/', function(req, res){
  res.render('index');
});

app.listen(3000);
