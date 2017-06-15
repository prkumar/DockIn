'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to theme settings
 */
var express = require('express');
var router = express.Router();

/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
var cors = require('cors');

var Theme = require('../../models/Theme');

/*********************** THEME TEMPLATE ROUTES ***********************/
module.exports.template = {};

/**
 * @api {start} /server/routes/theme Begins logging 
 * @apiName use
 * @apiGroup theme
 */
module.exports.template.use = function(req, res, next) {
    // do logging
    console.log('Intializing.....');
    next();
};

/**
 * @api {put} /server/routes/theme Creates a theme on the server
 * @apiName create
 * @apiGroup theme 
 * 
 * @apiParam {Number} user_id The id of the company or user
 *
 * @apiError ServerNotResponding
 */
module.exports.template.create = function(req, res) {
    var theme = new Theme();
    theme.user_id = req.params.user_id; //company or user id
    theme.form_color = "default";
    theme.background_img = "default";
    theme.displayPhone = false;
    theme.displayClock = false;
    theme.displaySignature = false;
    theme.additionalComments = false;

    theme.save(function(err) {
        if (err)
            res.status(400).send(err);

        res.status(200).json(theme);
    });

};

/**
 * @api {get} /server/routes/theme Get a theme by user id
 * @apiName get
 * @apiGroup theme
 * 
 * @apiParam {Number} user_id The id of the user or company
 * 
 * @apiError ServerNotResponding
 */
module.exports.template.get = function(req, res) {
    Theme.findOne({
        user_id: req.params.user_id
    }, function(err, theme) {
        if (err)
            res.status(400).send(err);

        res.status(200).json(theme);
    });
};

/**
 * @api {set} /server/routes/theme Updates the theme used by a user or company
 * @apiName update
 * @apiGroup theme
 * 
 * @apiParam {Number} user_id The id of the company or user
 * 
 * @apiError ServerNotResponding
 */
module.exports.template.update = function(req, res) {

    Theme.findOne({
        user_id: req.params.user_id
    }, function(err, theme) {

        if (err)
            res.status(400).send(err);

        theme.user_id = req.params.user_id; //company or user id
        if (req.body.form_color)
            theme.form_color = req.body.form_color;
        if (req.body.background_img)
            theme.background_img = req.body.background_img;
        if (req.body.displayPhone)
            theme.displayPhone = req.body.displayPhone;
        if (req.body.displayClock)
            theme.displayClock = req.body.displayClock;
        if (req.body.displaySignature)
            theme.displaySignature = req.body.displaySignature;
        if (req.body.additionalComments)
            theme.additionalComments = req.body.additionalComments;

        theme.save(function(err) {
            if (err)
                res.status(400).send(err);

            res.status(200).json(theme);
        });

    });
};

/**
 * @api {delete} /server/routes/theme Deletes a theme from the server
 * @apiName delete
 * @apiGroup theme
 * 
 * @apiParam {Number} user_id The id of the user or company
 * 
 * @apiError ServerNotResponding
 * @apiSuccess {String} OK
 */
module.exports.template.delete = function(req, res) {

    Theme.remove({
        user_id: req.params.user_id
    }, function(err, theme) {
        if (err)
            res.status(400).send(err);

        res.status(200).json({msg: "OK"});
    });


};
