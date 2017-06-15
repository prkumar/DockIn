'use strict';

/* This module is meant to house all of the API
 * routes that pertain to forms
 */
var express = require('express');
var router = express.Router();

var SubmittedForm = require('../../models/form/SubmittedForm');
var mongoose = require('mongoose');
var TemplateForm = require('../../models/form/FormTemplate');

/********** FORM TEMPLATE ROUTES **********/
module.exports.template = {};
 
 /**
 * @api {get} /server/routes/form Find the template used by company by id
 * @apiName findByCompanyId
 * @apiGroup form
 * 
 * @apiParam {Number} id The id of the company
 * 
 * @apiError TemplateNotFound {String} There was an error finding the template form.
 */
module.exports.template.findByCompanyId =  function(req, res) {
  TemplateForm.findOne({'_admin_id' : req.params.id}, function(err, template) {
    if(err)
      res.status(400).json({error: "There was an error finding the template form."});
    else
      res.status(200).json(template);
  });
};

/**
 * @api {get} /server/routes/form Find the template used by admin with id
 * @apiName findByAdminId
 * @apiGroup form
 * 
 * @apiParam {Number} adminid The id of the admin
 * 
 * @apiError TemplateNotFound {String} There was an error finding the template form.
 */
module.exports.template.findByAdminId = function(req,res){
  TemplateForm.findOne({'_admin_id' : req.params.adminid}, function(err, template) {
    if(err)
      res.status(400).json({error: "There was an error finding the template form."});
    else
      res.status(200).json(template);
  });
};

/**
 * @api {send} /server/routes/form Send the template used by admin with id
 * @apiName sendByAdminId
 * @apiGroup Form
 * 
 * @apiParam {Number} id The adminid of the admin
 * 
 * @apiError TemplateNotFound {String} There was an error finding the template form.
 */
module.exports.template.sendByAdminId = function(req,res){
  TemplateForm.findOne({'_admin_id' : req.params.adminid}, function(err, template) {
    if(err)
      res.status(400).json({error: "There was an error finding the template form."});
    else if(!template){//if doesn't exist
      createWithAdminId(req,res);
    }
    else{
      updateWithAdminId(req,res);
    }
  });
};

/**
 * @api {put} /server/routes/form Create a new template form with an admin id
 * @apiName createWithAdminId
 * @apiGroup form
 * 
 * @apiParam {Number} adminid The id of the admin
 * @apiParam {Template} template the template to be created on the server
 * 
 * @apiError ServerNotResponding 
 */
function createWithAdminId(req,res){
  var newTemplate = new TemplateForm();
  newTemplate._admin_id = req.params.adminid;
  newTemplate.template = req.body.template;

  newTemplate.save(function(err, template) {
    if(err)
        return res.status(400).json(err);
    else
        return res.status(200).json(template);
  });
}

/**
 * @api {set} /server/routes/form Update a template form with an admin id
 * @apiName updateWithAdminId
 * @apiGroup form
 * 
 * @apiParam {Number} adminid The id of the admin
 * @apiParam {Template} template the template to be created on the server
 * 
 * @apiError ServerNotResponding {String} There was an error updating a template
 */
function updateWithAdminId(req,res){
  var update = {template: req.body.template};

  TemplateForm.findOneAndUpdate({_admin_id: req.params.adminid}, update,
    function(err, template) {
        if(err)
          return res.status(400).json({error: "There was an error updating a template."});
        else
          return res.status(200).json(template);
    });
}

/**
 * @api {put} /server/routes/form Creates a new template
 * @apiName create
 * @apiGroup form
 * 
 * @apiParam {Number} adminid The id of the admin
 * @apiParam {Template} The template to be created
 * 
 * @apiError ServerNotResponding
 */
module.exports.template.create =  function(req, res) {
  var newTemplate = new TemplateForm();
  newTemplate._admin_id = new mongoose.Types.ObjectId(req.body._admin_id);
  newTemplate.template = req.body.template;

  newTemplate.save(function(err, template) {
    if(err)
        res.status(400).json(err);
    else
      res.status(200).json(template);
  });
};


/* Accept PUT request at /form/template */
/**
 * @api {set} /server/routes/form updates the template at form/template
 * @apiName update
 * @apiGroup form
 * 
 * @apiParam {Template} template The new template
 * @apiParam {Number} template_id The id of the template
 * 
 * @apiError ServerNotResponding {String} There was an error updating a template
 */
module.exports.template.update =  function(req, res) {
    var update = {template: req.body.template};
    var options = {new: true};

    TemplateForm.findOneAndUpdate({_id: req.body.template_id}, update, options,
      function(err, template) {
          if(err)
            res.status(400).json({error: "There was an error updating a template."});
          else
            res.status(200).json(template);
      });
};

/* accept DELETE request at /form/template/:template_id */
/**
 * @api {delete} /server/routes/form Deletes the template from the server
 * @apiName delete
 * @apiGroup form
 * 
 * @apiParam {Number} template_id The id of the template being deleted
 */
module.exports.template.delete =  function (req, res) {
    /* Get id param from request */
    var templateID = req.params.template_id;

    if(!templateID) {
      res.status(400).json({error: 'need a template id'});
      return;
    }

    TemplateForm.findOneAndRemove({_id: templateID}, function(err, result) {
      if(err) {
        res.status(400).json({error: 'There was problem removing the form template'});
        return;
      }
      res.status(200).json(result);
    });
};

/********** PATIENT FORM ROUTES **********/
module.exports.submitted_form = {};

/**
 * @api {get} /server/routes/form Finds the form by id
 * @apiName findById
 * @apiGroup form
 * 
 * @apiParam {Number} form_id The id of the form
 *
 * @apiError FormNotFound {String} An error occured while finding visitorList form
 */
module.exports.submitted_form.findById = function(req, res) {
  SubmittedForm.findOne({ '_id': req.params.form_id }, function (err, submittedForm) {
    if (err) {
      res.status(400).json({error: "An error occured while finding visitorList form"});
      return;
    }
    res.status(200).json(submittedForm);
  });
};

/**
 * @api {put} /server/routes/form Creates a patient form on the server
 * @apiName create
 * @apiGroup form
 * 
 * @apiParam {Number} _admin_id The id of the admin
 * @apiParam {String} firstName The first name of the patient
 * @apiParam {String} lastName The last name of the patient
 * @apiParam {String} patientEmail The email of the patient
 * 
 * @apiError ServerNotFound {String} An error ovvured while saving the submitted form
 */
module.exports.submitted_form.create = function(req, res) {
  var form = new SubmittedForm();
  form.form = req.body.form;
  form._admin_id = req.body._admin_id;
  form.firstName = req.body.firstName;
  form.lastName = req.body.lastName;
  form.patientEmail = req.body.patientEmail;
  form.date = new Date();
  form.save(function(err, savedForm){
    if (err){
      res.status(400).json({error: "An error occured while saving the submitted form"});
    }
    res.status(200).json(savedForm);
  });
};

/**
 * @api {get} /server/routes/form Request for form by patient info
 * @apiName findByPatientInfo
 * @apiGroup form
 * 
 * @apiParam {String} firstName The first name of the patient
 * @apiParam {String} lastName The last name of the patient
 * @apiParam {String} patientEmail The email of the patient
 * 
 * @apiError InsufficientInput {String} You must specify either both first and last name or email
 * @apiError FormNotFound {String} An error occured while finding visitorList form
 */
module.exports.submitted_form.findByPatientInfo = function(req, res) {
  var query = {},
    firstName = req.query.firstName,
    lastName = req.query.lastName,
    patientEmail = req.query.patientEmail;


  if(!((firstName && lastName) || patientEmail)) {
    res.status(400).json({error: "You must specify either both first and last name or email"});
    return;
  }
  if(firstName) query.firstName = firstName;
  if(lastName) query.lastName = lastName;
  if(patientEmail) query.patientEmail = patientEmail;


  if(req.query.mostRecent == "true") {
    SubmittedForm.findOne(query).sort('-date').exec(function (err, submittedForm) {
      if (err) {
        res.status(400).json({error: "An error occured while finding visitorList form"});
        return;
      }
      res.status(200).json(submittedForm);
    });
  }
  else {
      SubmittedForm.findOne(query, function(err, submittedForms) {
      if (err) {
        res.status(400).json({error: "An error occured while finding visitorList forms"});
        return;
      }
      res.status(200).json(submittedForms);
    });
  }
};
