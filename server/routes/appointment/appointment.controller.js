'use strict';

/*This module is meant to house the functions
 * used by the authorization (auth) API. The
 * actual API is set up in index.js

 Functions:
 authSignup()
 authLogin()
 authResetCredentials()
 */


/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
var Appointment = require('../../models/Appointment');

/****** Company TEMPLATE ROUTES ******/
module.exports.template = {};

/**
 * @api {put} /server/routes/appointment Create an appointment on the server
 * @apiName create
 * @apiGroup appointment
 * 
 * @apiParam {String} first_name The first name of the employee
 * @apiParam {String} last_name The last name of the employee
 * @apiParam {Date} date The date of the appointment
 * @apiParam {String} phone_number The phone number of the employee
 * @apiParam {ObjectID} company_id The id number of the employees company
 * @apiParam {String} provider_name The name of the appointment provider
 * 
 * @apiError CompanyNotFound {String} Could Not Find
 * @apiError ServerNotResponding {String} Could Not Save
 * @apiError AppointmentExists {String} Already Created
 */
module.exports.template.create = function(req, res) {
    var appointment = new Appointment();
    var param = req.body;

    //require provided info
    appointment.first_name = param.first_name;
    appointment.last_name = param.last_name;
    appointment.phone_number = param.phone_number;
    appointment.date = param.date;
    appointment.company_id = param.company_id;
    appointment.provider_name = param.provider_name;

    Appointment.find(
        {
            company_id:param.company_id,
            date:param.date
        }, function(err, appointments){
            if(err) return res.status(400).json({error: "Could Not Find Appointment"});
            if(appointments.length==0) {
                appointment.save(function (err, a) {
                    if (err)
                        return res.status(400).json({error: "Could Not Save Appointment"});
                    return res.status(200).json(a);
                });
            }else{
                return res.status(400).json({error: "Already Created Appointment"});
            }
        });
};

/**
 * @api {get} /server/routes/appointment Get all appointments of a company
 * @apiName getAll
 * @apiGroup appointment
 * 
 * @apiParam {ObjectID} id The id number of the company
 * 
 * @apiError CompanyNotFound
 */
module.exports.template.getAll = function(req, res) {
    Appointment.find({company_id: req.params.id}, function(err, result){
            if(err){
                return res.status(400).json(err);
            }
            return res.status(200).json(result);
        });
};

/**
 * @api {get} /server/routes/appointment Get appointment by id
 * @apiName get
 * @apiGroup appointment
 * 
 * @apiParam {ObjectID} id The id number of the appointment
 * 
 * @apiError AppointmentNotFound {String} Could not find appointment 
 */
module.exports.template.get = function(req, res) {
    Appointment.findOne({_id: req.params.id}, function(err, a) {
        if(err || !a)
            return res.status(400).send({error: "Could not find appointment"});
        return res.status(200).json(a);
    });
};


/**
 * @api {put} /server/routes/appointment Update an appointment on the server
 * @apiName update
 * @apiGroup appointment
 * 
 * @apiParam {String} first_name The first name of the employee
 * @apiParam {String} last_name The last name of the employee
 * @apiParam {Date} date The date of the appointment
 * @apiParam {String} phone_number The phone number of the employee
 * @apiParam {String} provider_name The name of the appointment provider
 * 
 * @apiError CompanyNotFound {String} Could not find appointment
 * @apiError ServerNotResponding {String} Could Not Save Appointment
 */
module.exports.template.update = function(req, res){
    Appointment.findOne({_id: req.params.id}, function (err, a) {
        if(err || !a)
            return res.status(401).json({error: "Could not find appointment"});

        if (req.body.first_name !== undefined)
            a.first_name = req.body.first_name;

        if (req.body.last_name !== undefined)
            a.last_name = req.body.last_name;

        if (req.body.phone_number !== undefined)
            a.phone_number  = req.body.phone_number ;

        if (req.body.date!== undefined)
            a.date = req.body.date;
        if (req.body.provider_name!== undefined)
            a.provider_name = req.body.provider_name;
        a.save(function(err) {
            if(err) {
                return res.status(400).json({error: "Could Not Save Appointment"});
            }
            return res.status(200).json(a);
        });
    });
};

/**
 * @api {delete} /server/routes/appointment Delete an appointment on the server
 * @apiName delete
 * @apiGroup appointment
 * 
 * @apiParam {ObjectID} id The id number of the appointment
 * 
 * @apiError AppointmentNotFound {String} Could Not Find Appointment
 * @apiError ServerNotResponding {String} Could Not Delete Appointment
 */
module.exports.template.delete = function(req, res){
    Appointment.findById(req.params.id, function(err, a) {
        if(err)
            res.status(400).json({error: "Could Not Find Appointment"});
        a.remove(function(err) {
            if(err) {
                res.status(400).json({error: "Could Not Delete Appointment"});
            } else {
                return res.status(200).json(a);
            }
        });
    });
};
