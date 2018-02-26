'use strict';

var Register = require('./RegisterService');
var Common = require('./CommonStudentService');
var Suspend = require('./SuspendStudentService');
var Retrieve = require('./RetrieveStudentService');

module.exports.registerStud = function registerStud (req, res, next) {
  Register.registerStud(req.swagger.params, res, next);
};

module.exports.commonStud = function commonStud (req, res, next) {
  Common.commonStud(req.swagger.params, res, next);
};

module.exports.suspendStud = function suspendStud (req, res, next) {
  Suspend.suspendStud(req.swagger.params, res, next);
};

module.exports.retrieveStud = function retrieveStud (req, res, next) {
  Retrieve.retrieveStud(req.swagger.params, res, next);
};
