var express = require('express');

var app = express();

//if PORT exists in the environment then use it, if not, use 5000
var port = process.env.PORT || 5000;

var nav = [{
            Link:'/Orders',
            Text:'Orders'
        }, {
            Link:'/Receipts',
            Text:'Receipts'
        }, {
            Link:'/ValueAddedServices',
            Text:'Value Added Services'
        }, {
            Link:'/Shipments',
            Text:'Shipments'
        }, {
            Link:'/Tickets',
            Text:'Tickets'
        }];

var activityDataSummary = [{
                            Label:'Orders',
                            Data:'54776'
                        }, {
                            Label:'Receipts',
                            Data:'132'
                        }, {
                            Label:'Value Added Services',
                            Data:'56'
                        }, {
                            Label:'Shipments',
                            Data:'2775'
                        }, {
                            Label:'Tickets',
                            Data:'442'
                        }];

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {
                        title: 'Amplifier Dash',
                        nav: nav,
                        activityDataSummary: activityDataSummary});
});

app.get('/Shipments', function (req, res) {
    res.send('Shipment Data Goes Here');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});
