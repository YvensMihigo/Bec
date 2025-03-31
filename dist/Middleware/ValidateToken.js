"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var verifyToken = exports.verifyToken = function verifyToken(req, res, next) {
  try {
    var token = req.header('xx-token');
    if (!token) {
      return res.status(401).json({
        resp: false,
        msg: 'There is not Token in the request'
      });
    }
    var _jwt$verify = _jsonwebtoken["default"].verify(token, process.env.APP_KEY_JWT),
      uidPerson = _jwt$verify.uidPerson;
    req.uid = uidPerson;
    next();
  } catch (e) {
    return res.status(500).json({
      resp: false,
      msg: e.message,
      user: {
        uid: 0,
        firstName: '',
        lastName: '',
        image: '',
        email: '',
        rol_id: 0
      },
      token: ''
    });
  }
};