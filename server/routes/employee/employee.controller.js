'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */
var exports = module.exports;

var Employee = require('../../models/Employee');

/**
 * @api {get} /server/routes/employee Request User information
 * @apiName login
 * @apiGroup employee
 *
 * @apiParam {String} email The body of the email containing the employees name
 *
 * @apiError UserNotFound {String} Can not Find Employee
 * @apiError IncorrectCredentials {String} Incorrect Credentials
 */
exports.login = function(req, res) {
    Employee.findOne({email:req.body.email}, function(err, e) {
        if(err || !e){
          return res.status(400).send({error: "Can not Find Employee"});
        }
        if(!e.validPassword(req.body.password))
          return res.status(400).send({error: "Incorrect Credentials"});
        var employee_json=e.toJSON();
        delete employee_json.password;
        return res.status(200).json(employee_json);
    });
};

/**
 * @api {get} /server/routes/employee Request all employees user information
 * @apiName getAllEmployees
 * @apiGroup employee
 *
 * @apiParam {ObjectID} id The id of the company
 *
 * @apiError UserNotFound {String} Can not Find Employee
 */
exports.getAllEmployees = function(req, res) {
  Employee.find({company_id : req.params.id}, { password: 0}, function(err, result) {
    if(err){
      return res.status(400).send({error: "Can not Find Employee"});
    }
    return res.status(200).json(result);
  });
};

/**
 * @api {get} /server/routes/employee Request employee by ID
 * @apiName getById
 * @apiGroup employee
 *
 * @apiParam {ObjectID} id The id of the employee
 *
 * @apiError UserNotFound {String} Can not Find Employee
 */
exports.getById = function(req, res) {
   Employee.findById(req.params.id, { password: 0}, function(err, employee) {
      if(err) {
          return res.status(400).json({error: "Can not Find Employee"});
      } else {
          console.log(employee)
          return res.status(200).json(employee);
      }
    });
};

/**
 * @api {put} /server/routes/employee Adds the employee to the server
 * @apiName insert
 * @apiGroup employee
 *
 * @apiParam {String} first_name The first name of the employee
 * @apiParam {String} last_name The last name of the employee
 * @apiParam {String} email The email address of the employee
 * @apiParam {String} phone_number The phone number of the employee
 * @apiParam {ObjectID} company_id The id number of the employees company
 * @apiParam {String} password The password required for the user to login
 * @apiParam {String} role The role of the employee in the company
 *
 * @apiError ServerNotResponding {String} Can not Save Employee
 */
exports.insert = function(req, res) {
    var employee = new Employee();

    /* required info */
    employee.first_name = req.body.first_name;
    employee.last_name = req.body.last_name;
    employee.email = req.body.email,
    employee.phone_number  = req.body.phone_number,
    employee.company_id = req.body.company_id,
    employee.password = employee.generateHash(req.body.password),
    employee.role =  req.body.role

    employee.save(function(err, e) {
        if(err) {
            return res.status(400).json({error: "Can not Save Employee"});
        }
        var employee_json=e.toJSON();
        delete employee_json.password;
        return res.status(200).json(employee_json);
    });
};

/**
 * @api {put} /server/routes/employee Updates the employee information on the server
 * @apiName update
 * @apiGroup employee
 *
 * @apiParam {Number} id The employee id 
 * @apiParam {String} first_name The first name of the employee
 * @apiParam {String} last_name The last name of the employee
 * @apiParam {String} email The email address of the employee
 * @apiParam {String} phone_number The phone number of the employee
 * @apiParam {ObjectID} company_id The id number of the employees company
 * @apiParam {String} password The password required for the user to login
 * @apiParam {String} role The role of the employee in the company
 *
 * @apiError UserNotFound {String} Can not Update Employee
 * @apiError ServerNotResponding {String} Can not Save Employee
 */
exports.update = function(req, res) {
    Employee.findById(req.params.id, function (err, employee) {
        if(err)
            return res.status(400).json({error: "Can not Update Employee"});
 
        employee.first_name = req.body.first_name || employee.first_name;
        employee.last_name = req.body.last_name || employee.last_name;
        employee.email = req.body.email || employee.email;
        employee.phone_number = req.body.phone_number || employee.phone_number;
        employee.password = employee.generateHash(req.body.password) || employee.password;
        employee.role = req.body.role || employee.role;

        employee.save(function(err) {
            console.log(err);
            console.log(employee);
            if(err)
                return res.status(400).json({error: "Can not Save Employee"});
            var employee_json=employee.toJSON();
            delete employee_json.password;
            return res.status(200).send(employee_json);
        });
   });
};


/**
 * @api {delete} /server/routes/employee Delete employee by id
 * @apiName delete
 * @apiGroup employee
 *
 * @apiParam {ObjectID} id The id of the employee
 *
 * @apiError UserNotFound {String} Can not Find Employee
 */
exports.delete = function(req, res) {
  Employee.findById(req.params.id, function(err, employee) {
    return employee.remove(function(err) {
      if(err) {
        res.status(400).json({error: "Can not Find Employee"});
      } else {
          var employee_json=employee.toJSON();
          delete employee_json.password;
          return res.status(200).send(employee_json);
      }
    });
  });
};
