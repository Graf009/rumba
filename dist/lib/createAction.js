'use strict';

exports.__esModule = true;
exports.mergeOptions = undefined;

var _lodash = require('lodash.mapvalues');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.merge');

var _lodash4 = _interopRequireDefault(_lodash3);

var _sendRequest = require('./sendRequest');

var _sendRequest2 = _interopRequireDefault(_sendRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reserved = ['onResponse', 'onError', 'getToken', 'getLocale'];
var result = function result(fn, arg) {
  return typeof fn === 'function' ? fn(arg) : fn;
};

// TODO: check entities cache in store and dont fetch if we have it already

/*
 app must have redux-thunk installed
 possible options:

 - onError (optional)(function)
 - onResponse (optional)(function)

 - subset (optional)(string)
 - method (required)(get, post, put, delete, or patch)
 - params (object)
 - endpoint (required)(url string)
 - model (optional)(normalizr model)
 - collection (default false)(boolean)
 - fresh (default to false)(boolean)

 - headers (optional)(function)
 - query (optional)(object)
 - body (optional)(object)
 - withCredentials (default false)(boolean)
 - token (optional)(string)
 - getToken (optional)(function)
 - getLocale (optional)(function)
 - auth (optional)(array)


 all options can either be a value, or a function that returns a value.
 if you define a function, it will receive options.params as an argument
 */

var isReserved = function isReserved(k) {
  return reserved.indexOf(k) !== -1;
};

/*
 merge our multitude of option objects together
 defaults = options defined in createAction
 opt = options specified in action creator
 */
var mergeOptions = exports.mergeOptions = function mergeOptions(defaults, opt) {
  return (0, _lodash2.default)((0, _lodash4.default)({}, defaults, opt), function (v, k, _ref) {
    var params = _ref.params;

    if (isReserved(k)) return v;
    return result(v, params);
  });
};

exports.default = function () {
  var defaults = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  return function () {
    var opt = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var options = mergeOptions(defaults, opt);

    if (!options.method) throw new Error('Missing method');
    if (!options.endpoint) throw new Error('Missing endpoint');

    return function (dispatch, getState) {
      return (0, _sendRequest2.default)({ options: options, dispatch: dispatch, getState: getState });
    };
  };
};