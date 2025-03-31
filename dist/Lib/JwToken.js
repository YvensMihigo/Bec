"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateJsonWebToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var generateJsonWebToken = exports.generateJsonWebToken = function generateJsonWebToken(uidPerson) {
  return new Promise(function (resolve, reject) {
    var payload = {
      uidPerson: uidPerson
    };
    _jsonwebtoken["default"].sign(payload, process.env.APP_KEY_JWT, {
      expiresIn: '12h'
    }, function (err, token) {
      if (!err) resolve(token);else reject('Error Generate a Token');
    });
  });
};