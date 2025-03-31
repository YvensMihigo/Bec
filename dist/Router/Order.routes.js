"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var orders = _interopRequireWildcard(require("../Controller/OrdersController"));
var client = _interopRequireWildcard(require("../Controller/ClientController"));
var _ValidateToken = require("../Middleware/ValidateToken");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = (0, _express.Router)();

// Routes existantes
router.post('/add-new-orders', _ValidateToken.verifyToken, orders.addNewOrders);
router.get('/get-orders-by-status/:statusOrder', _ValidateToken.verifyToken, orders.getOrdersByStatus);
router.get('/get-details-order-by-id/:idOrderDetails', _ValidateToken.verifyToken, orders.getDetailsOrderById);
router.put('/update-status-order-dispatched', _ValidateToken.verifyToken, orders.updateStatusToDispatched);
router.get('/get-all-orders-by-delivery/:statusOrder', _ValidateToken.verifyToken, orders.getOrdersByDelivery);
router.put('/update-status-order-on-way/:idOrder', _ValidateToken.verifyToken, orders.updateStatusToOntheWay);
router.put('/update-status-order-delivered/:idOrder', _ValidateToken.verifyToken, orders.updateStatusToDelivered);
router.get('/get-list-orders-for-client', _ValidateToken.verifyToken, client.getListOrdersForClient);

// Nouvelles routes de paiement
router.get('/payment-result', orders.getPaymentResultPage);
router.get('/api/transaction-status', orders.getTransactionStatus);
router.post('/pawapay-callback', orders.pawapayCallback);
var _default = exports["default"] = router;