"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ValidateToken = require("../Middleware/ValidateToken");
var register = _interopRequireWildcard(require("../Controller/RegisterController"));
var user = _interopRequireWildcard(require("../Controller/UserController"));
var _Multer = require("../Lib/Multer");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = (0, _express.Router)();
router.post('/register-client', _Multer.upLoadsProfile.single('image'), register.registerClient);
router.post('/register-delivery', [_ValidateToken.verifyToken, _Multer.upLoadsProfile.single('image')], register.registerDelivery);
router.get('/get-user-by-id', _ValidateToken.verifyToken, user.getUserById);
router.put('/edit-profile', _ValidateToken.verifyToken, user.editProfile);
router.get('/get-user-updated', _ValidateToken.verifyToken, user.getUserUpdated);
router.put('/change-password', _ValidateToken.verifyToken, user.changePassword);
router.put('/change-image-profile', [_ValidateToken.verifyToken, _Multer.upLoadsProfile.single('image')], user.changeImageProfile);
router.get('/get-addresses', _ValidateToken.verifyToken, user.getAddressesUser);
router["delete"]('/delete-street-address/:idAddress', _ValidateToken.verifyToken, user.deleteStreetAddress);
router.post('/add-new-address', _ValidateToken.verifyToken, user.addStreetAddress);
router.get('/get-address', _ValidateToken.verifyToken, user.getAddressOne);
router.put('/update-notification-token', _ValidateToken.verifyToken, user.updateNotificationToken);
router.get('/get-admins-notification-token', _ValidateToken.verifyToken, user.getAdminNotificationToken);
router.put('/update-delivery-to-client/:idPerson', _ValidateToken.verifyToken, user.updateDeliveryToClient);
var _default = exports["default"] = router;