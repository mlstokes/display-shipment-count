var express = require('express');
var _ = require('underscore');
var sql = require('mssql');

var ordersRouter = express.Router();

var router = function (navData, activityData, queries) {
    ordersRouter.route('/')
      .get(function (req, res) {
        var request = new sql.Request();
        request.query(queries.ordersQuery,
                      function(err, recordset) {
                        var ordersData = recordset.recordset;

                        res.render('activity', {
                                                title: 'Orders',
                                                nav: navData,
                                                activityDataSummary: _.where(activityData, {Label: 'Orders'}),
                                                activityData: ordersData
                                            });

                    });

    });

    return ordersRouter;
};

module.exports = router;
