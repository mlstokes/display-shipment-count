var express = require('express');
var _ = require('underscore');

var ordersRouter = express.Router();

var router = function (navData, activityData) {
    ordersRouter.route('/')
      .get(function (req, res) {
        res.render('activity', {
                                title: 'Orders',
                                nav: navData,
                                activityDataSummary: _.where(activityData, {Label: 'Orders'})
                            });
    });

    return ordersRouter;
};

module.exports = router;
