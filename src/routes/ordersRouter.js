var express = require('express');
var _ = require('underscore');

var ordersRouter = express.Router();

var navData = require('../data/navData.json');
var activityData = require('../data/activityData.json');

ordersRouter.route('/')
  .get(function (req, res) {
    res.render('activity', {
                            title: 'Orders',
                            nav: navData,
                            activityDataSummary: _.where(activityData, {Label: 'Orders'})
                        });
});

module.exports = ordersRouter;
