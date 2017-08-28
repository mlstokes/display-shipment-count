var express = require('express');

var app = express();

var _ = require('underscore');

//if PORT exists in the environment then use it, if not, use 5000
var port = process.env.PORT || 5000;

var shipmentsRouter = require('./src/routes/shipmentsRouter');
var ordersRouter = require('./src/routes/ordersRouter');

var navData = require('./src/data/navData.json');
var activityData = require('./src/data/activityData.json');

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Shipments', shipmentsRouter);

app.use('/Orders', ordersRouter);

app.get('/', function (req, res) {
    res.render('index', {
                        title: 'Amplifier Dash',
                        nav: navData,
                        activityDataSummary: activityData});
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

//testing stuff

//var underscoreWhere = _.where(activityDataSummary, {Label: 'Shipments'});

//console.log('activityDataSummary:');
//console.log(activityDataSummary);

console.log('activityData:');
console.log(activityData);

console.log('navDataJson:');
console.log(navData);
