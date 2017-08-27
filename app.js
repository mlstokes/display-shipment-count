var express = require('express');

var app = express();

var _ = require('underscore');

//if PORT exists in the environment then use it, if not, use 5000
var port = process.env.PORT || 5000;

var shipmentsRouter = express.Router();
var ordersRouter = express.Router();

var nav = [{
            Link:'/Orders',
            Text:'Orders'
        }, {
        //     Link:'/Receipts',
        //     Text:'Receipts'
        // }, {
        //     Link:'/ValueAddedServices',
        //     Text:'Value Added Services'
        // }, {
            Link:'/Shipments',
            Text:'Shipments'
        // }, {
        //     Link:'/Tickets',
        //     Text:'Tickets'
        }];

var activityDataSummary = [{
                            Link:'/Orders',
                            Label:'Orders',
                            Data:'54776'
                        }, {
                        //     Label:'Receipts',
                        //     Data:'132'
                        // }, {
                        //     Label:'Value Added Services',
                        //     Data:'56'
                        // }, {
                            Link: '/Shipments',
                            Label:'Shipments',
                            Data:'2775'
                        // }, {
                        //     Label:'Tickets',
                        //     Data:'442'
                        }];

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

shipmentsRouter.route('/')
  .get(function (req, res) {
    res.render('activity', {
                            title: 'Shipments',
                            nav: nav,
                            activityDataSummary: _.where(activityDataSummary, {Label: 'Shipments'})
                        });
});

app.use('/Shipments', shipmentsRouter);

ordersRouter.route('/')
  .get(function (req, res) {
    res.render('activity', {
                            title: 'Orders',
                            nav: nav,
                            activityDataSummary: _.where(activityDataSummary, {Label: 'Orders'})
                        });
});

app.use('/Orders', ordersRouter);

app.get('/', function (req, res) {
    res.render('index', {
                        title: 'Amplifier Dash',
                        nav: nav,
                        activityDataSummary: activityDataSummary});
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

var underscoreWhere = _.where(activityDataSummary, {Label: 'Shipments'});

console.log(activityDataSummary);
console.log(underscoreWhere);
