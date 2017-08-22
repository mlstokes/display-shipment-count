var express = require('express');

var app = express();

var port = 5000;

app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function (req, res) {
  res.send('Welcome to the Amp Dashboard');
});

app.get('/shipments', function (req, res) {
  res.send('Shipment Data Goes Here');
});

app.listen(port, function (err) {
  console.log('running server on port ' + port);
});
