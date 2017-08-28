var express = require('express');
var _ = require('underscore');

var shipmentsRouter = express.Router();

var navData = require('../data/navData.json');
var activityData = require('../data/activityData.json');

shipmentsRouter.route('/')
  .get(function (req, res) {
    res.render('activity', {
                            title: 'Shipments',
                            nav: navData,
                            activityDataSummary: _.where(activityData, {Label: 'Shipments'})
                        });
});

module.exports = shipmentsRouter;
