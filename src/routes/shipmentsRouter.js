var express = require('express');
var shipmentsRouter = express.Router();
var _ = require('underscore');

var router = function (navData, activityData) {
    shipmentsRouter.route('/')
      .get(function (req, res) {
        res.render('activity', {
                                title: 'Shipments',
                                nav: navData,
                                activityDataSummary: _.where(activityData, {Label: 'Shipments'})
                            });
    });

    return shipmentsRouter;
};

module.exports = router;
