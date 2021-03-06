var express = require('express');
var app = express();
var _ = require('underscore');
var sql = require('mssql');
var mssqlWMSConfig = require('./src/data/mssqlWMSConfig.json');
var queries = require('./src/data/queries.json');

sql.connect(mssqlWMSConfig, function (err) {
    if (err) { console.log(err); } else { console.log('Connected to WMS'); }
});

// sql.connect(mssqlBFConfig, function (err) {
//     if (err) { console.log(err); } else { console.log('Connected to BF'); }
// });

//if PORT exists in the environment then use it, if not, use 5000
var port = process.env.PORT || 5000;

var navData = require('./src/data/navData.json');
var activityData = require('./src/data/activityData.json');

var shipmentsRouter = require('./src/routes/shipmentsRouter')(navData, activityData, queries);
var ordersRouter = require('./src/routes/ordersRouter')(navData, activityData, queries);

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Shipments', shipmentsRouter);

app.use('/Orders', ordersRouter);

app.get('/', function (req, res) {

    //console.log(queries.summaryQuery);
    var summaryData = new sql.Request();

    var queryData = summaryData.query(queries.summaryQuery,
      function (err, recordset) {
            var queryData = recordset.recordset;
            console.log(queryData);
            res.render('index', {
                                    title: 'Amplifier Dash',
                                    nav: navData,
                                    activityDataSummary: queryData});
            return queryData;
        });

});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

//testing stuff//

//var underscoreWhere = _.where(activityDataSummary, {Label: 'Shipments'});

//console.log('activityDataSummary:');
//console.log(activityDataSummary);

//console.log('activityData:');
//console.log(activityData);

//console.log('navDataJson:');
//console.log(navData);
