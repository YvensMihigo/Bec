"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _dotenv = require("dotenv");
var _http = require("http");
var _socket = _interopRequireDefault(require("socket.io"));
var _SocketOrderDelivery = require("./Sockets/SocketOrderDelivery");
var _Auth = _interopRequireDefault(require("./Router/Auth.routes"));
var _User = _interopRequireDefault(require("./Router/User.routes"));
var _Product = _interopRequireDefault(require("./Router/Product.routes"));
var _Category = _interopRequireDefault(require("./Router/Category.routes"));
var _Order = _interopRequireDefault(require("./Router/Order.routes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
(0, _dotenv.config)();
var app = (0, _express["default"])();

// CONFIG SOCKET 
var httpServer = (0, _http.createServer)(app);
var io = new _socket["default"](httpServer);
(0, _SocketOrderDelivery.socketOrderDelivery)(io);
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use('/api', _Auth["default"]);
app.use('/api', _User["default"]);
app.use('/api', _Product["default"]);
app.use('/api', _Category["default"]);
app.use('/api', _Order["default"]);
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'Uploads/Profile')));
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'Uploads/Products')));
var _default = exports["default"] = httpServer;