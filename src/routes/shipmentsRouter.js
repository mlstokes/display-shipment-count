var express = require('express');
var shipmentsRouter = express.Router();
var _ = require('underscore');
var sql = require('mssql');

var router = function (navData, activityData, queries) {
    shipmentsRouter.route('/')
      .get(function (req, res) {
        var request = new sql.Request();

        request.query(queries.shipmentsQuery,
                      function(err, recordset) {
                        var shipmentsData = recordset.recordset;
                        console.log('shipmentsData:')
                        console.log(shipmentsData);
                        console.log('map(shipmentsData, property(\'Activities\')');
                        console.log(_.map(shipmentsData, _.property('Activities')));

                        res.render('activity', {
                                                title: 'Shipments',
                                                nav: navData,
                                                activityDataSummary: _.where(activityData, {Label: 'Shipments'}),
                                                activityData: shipmentsData
                                            });
                      });

    });

    return shipmentsRouter;
};

module.exports = router;
