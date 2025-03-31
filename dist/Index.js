"use strict";

var _App = _interopRequireDefault(require("./App"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_App["default"].listen(process.env.APP_PORT, function () {
  return console.log('Server on port ' + process.env.APP_PORT);
});