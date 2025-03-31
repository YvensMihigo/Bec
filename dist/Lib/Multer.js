"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upLoadsProfile = exports.upLoadsProducts = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var storageProfile = _multer["default"].diskStorage({
  destination: function destination(req, res, cb) {
    cb(null, 'src/Uploads/Profile');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + _path["default"].extname(file.originalname));
  }
});
var upLoadsProfile = exports.upLoadsProfile = (0, _multer["default"])({
  storage: storageProfile
});
var storageProducts = _multer["default"].diskStorage({
  destination: function destination(req, res, cb) {
    cb(null, 'src/Uploads/Products');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + _path["default"].extname(file.originalname));
  }
});
var upLoadsProducts = exports.upLoadsProducts = (0, _multer["default"])({
  storage: storageProducts
});