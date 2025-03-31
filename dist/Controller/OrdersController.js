"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateStatusToOntheWay = exports.updateStatusToDispatched = exports.updateStatusToDelivered = exports.pawapayCallback = exports.getTransactionStatus = exports.getPaymentResultPage = exports.getOrdersByStatus = exports.getOrdersByDelivery = exports.getDetailsOrderById = exports.addNewOrders = void 0;
var _express = require("express");
var _mysql = _interopRequireDefault(require("../Database/mysql"));
var _axios = _interopRequireDefault(require("axios"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _winston = _interopRequireDefault(require("winston"));
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var OPERATORS = {
  'AIRTEL MONEY': {
    pawapay: 'AIRTEL_COD',
    maishapay: 'AIRTEL'
  },
  'ORANGE MONEY': {
    pawapay: 'ORANGE_COD',
    maishapay: 'ORANGE'
  },
  'M-PESA': {
    pawapay: 'VODACOM_COD',
    maishapay: 'MPESA'
  }
};
var logger = _winston["default"].createLogger({
  level: 'info',
  format: _winston["default"].format.combine(_winston["default"].format.timestamp(), _winston["default"].format.json()),
  transports: [new _winston["default"].transports.File({
    filename: 'logs/payment_errors.log',
    level: 'error',
    format: _winston["default"].format.combine(_winston["default"].format.timestamp(), _winston["default"].format.json())
  }), new _winston["default"].transports.File({
    filename: 'logs/payment_combined.log',
    format: _winston["default"].format.combine(_winston["default"].format.timestamp(), _winston["default"].format.json())
  }), new _winston["default"].transports.Console({
    format: _winston["default"].format.combine(_winston["default"].format.colorize(), _winston["default"].format.simple(), _winston["default"].format.timestamp())
  })]
});

// Fonction pour formater les logs de transaction
var transactionLogger = function transactionLogger(transactionId, message) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  logger.info(_objectSpread(_objectSpread({
    transactionId: transactionId,
    message: message
  }, data), {}, {
    timestamp: new Date().toISOString()
  }));
};
var addNewOrders = exports.addNewOrders = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req) {
    var res,
      transactionStart,
      _req$body,
      uidAddress,
      total,
      typePayment,
      products,
      instructions,
      customerPhoneNumber,
      orderResult,
      orderId,
      _iterator,
      _step,
      product,
      paymentResult,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          res = _args.length > 1 && _args[1] !== undefined ? _args[1] : _express.response;
          transactionStart = Date.now();
          _context.prev = 2;
          _req$body = req.body, uidAddress = _req$body.uidAddress, total = _req$body.total, typePayment = _req$body.typePayment, products = _req$body.products, instructions = _req$body.instructions, customerPhoneNumber = _req$body.customerPhoneNumber;
          transactionLogger('SYSTEM', 'Début de création de commande', {
            clientId: req.uid,
            amount: total,
            paymentType: typePayment
          });
          if (OPERATORS[typePayment]) {
            _context.next = 8;
            break;
          }
          transactionLogger('SYSTEM', 'Type de paiement non supporté', {
            typePayment: typePayment
          });
          return _context.abrupt("return", res.status(400).json({
            resp: false,
            msg: 'Type de paiement non supporté'
          }));
        case 8:
          _context.next = 10;
          return _mysql["default"].query("INSERT INTO orders \n            (client_id, address_id, amount, pay_type, special_instructions, status, is_mobile_payment)\n            VALUES (?, ?, ?, ?, ?, 'PENDING', 1)", [req.uid, uidAddress, total, typePayment, instructions]);
        case 10:
          orderResult = _context.sent;
          orderId = orderResult.insertId || orderResult[0].insertId;
          transactionLogger('SYSTEM', 'Commande créée en base', {
            orderId: orderId
          });
          if (!Array.isArray(products)) {
            _context.next = 32;
            break;
          }
          _iterator = _createForOfIteratorHelper(products);
          _context.prev = 15;
          _iterator.s();
        case 17:
          if ((_step = _iterator.n()).done) {
            _context.next = 23;
            break;
          }
          product = _step.value;
          _context.next = 21;
          return _mysql["default"].query('INSERT INTO orderDetails (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [orderId, product.uidProduct, product.quantity, product.quantity * product.price]);
        case 21:
          _context.next = 17;
          break;
        case 23:
          _context.next = 28;
          break;
        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](15);
          _iterator.e(_context.t0);
        case 28:
          _context.prev = 28;
          _iterator.f();
          return _context.finish(28);
        case 31:
          transactionLogger('SYSTEM', 'Produits ajoutés à la commande', {
            orderId: orderId,
            productCount: products.length
          });
        case 32:
          if (!(process.env.MAISHAPAY_ENABLED === '1')) {
            _context.next = 38;
            break;
          }
          _context.next = 35;
          return initiateMaishapayPayment(total, customerPhoneNumber, typePayment, req.uid);
        case 35:
          _context.t1 = _context.sent;
          _context.next = 41;
          break;
        case 38:
          _context.next = 40;
          return initiatePawapayPayment(total, customerPhoneNumber, typePayment, req.uid);
        case 40:
          _context.t1 = _context.sent;
        case 41:
          paymentResult = _context.t1;
          transactionLogger(paymentResult.transactionId, 'Paiement initié', {
            paymentUrl: paymentResult.paymentUrl,
            status: paymentResult.status,
            duration: Date.now() - transactionStart
          });
          res.json({
            resp: true,
            msg: 'Commande créée avec succès',
            transactionId: paymentResult.transactionId,
            paymentUrl: paymentResult.paymentUrl
          });
          _context.next = 50;
          break;
        case 46:
          _context.prev = 46;
          _context.t2 = _context["catch"](2);
          transactionLogger('SYSTEM', 'Erreur création commande', {
            error: _context.t2.message,
            stack: _context.t2.stack,
            duration: Date.now() - transactionStart
          });
          res.status(500).json({
            resp: false,
            msg: 'Erreur lors de la création de la commande',
            error: _context.t2.message
          });
        case 50:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 46], [15, 25, 28, 31]]);
  }));
  return function addNewOrders(_x) {
    return _ref.apply(this, arguments);
  };
}();
function initiatePawapayPayment(_x2, _x3, _x4, _x5) {
  return _initiatePawapayPayment.apply(this, arguments);
}
function _initiatePawapayPayment() {
  _initiatePawapayPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(amount, phone, operator, clientInfo) {
    var transactionStart, depositId, statementDesc, payload, _response3$data, _response3, paymentUrl, _error$response;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          transactionStart = Date.now();
          depositId = _crypto["default"].randomUUID();
          statementDesc = "CL".concat(clientInfo).concat(depositId.substring(0, 6));
          transactionLogger(depositId, 'Initialisation paiement Pawapay', {
            amount: amount,
            phone: phone,
            operator: operator,
            clientInfo: clientInfo
          });
          payload = {
            depositId: depositId,
            amount: parseFloat(amount).toFixed(2),
            currency: "USD",
            correspondent: OPERATORS[operator].pawapay,
            payer: {
              type: "MSISDN",
              address: {
                value: phone.replace('+', '')
              }
            },
            customerTimestamp: new Date().toISOString(),
            statementDescription: statementDesc,
            country: "COD",
            callbackUrl: process.env.PAWAPAY_CALLBACK_URL || "".concat(process.env.BASE_URL, "/pawapay-callback")
          };
          _context12.prev = 5;
          transactionLogger(depositId, 'Envoi requête à Pawapay', {
            payload: payload
          });
          _context12.next = 9;
          return _axios["default"].post("".concat(process.env.PAWAPAY_API_URL, "/deposits"), payload, {
            headers: {
              'Authorization': "Bearer ".concat(process.env.PAWAPAY_API_KEY),
              'Content-Type': 'application/json'
            }
          });
        case 9:
          _response3 = _context12.sent;
          paymentUrl = (_response3$data = _response3.data) !== null && _response3$data !== void 0 && _response3$data.checkoutUrl ? _response3.data.checkoutUrl : "".concat(process.env.BASE_URL, "/payment-result?transactionId=").concat(depositId);
          transactionLogger(depositId, 'Réponse Pawapay reçue', {
            status: 'SUBMITTED',
            paymentUrl: paymentUrl,
            responseData: _response3.data,
            duration: Date.now() - transactionStart
          });
          return _context12.abrupt("return", {
            status: 'SUBMITTED',
            transactionId: depositId,
            paymentUrl: paymentUrl
          });
        case 15:
          _context12.prev = 15;
          _context12.t0 = _context12["catch"](5);
          transactionLogger(depositId, 'Erreur API Pawapay', {
            error: ((_error$response = _context12.t0.response) === null || _error$response === void 0 ? void 0 : _error$response.data) || _context12.t0.message,
            status: 'FAILED',
            duration: Date.now() - transactionStart
          });
          return _context12.abrupt("return", {
            status: 'FAILED',
            transactionId: depositId,
            paymentUrl: "".concat(process.env.BASE_URL, "/payment-result?transactionId=").concat(depositId)
          });
        case 19:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[5, 15]]);
  }));
  return _initiatePawapayPayment.apply(this, arguments);
}
function initiateMaishapayPayment(_x6, _x7, _x8, _x9) {
  return _initiateMaishapayPayment.apply(this, arguments);
}
function _initiateMaishapayPayment() {
  _initiateMaishapayPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(amount, phone, operator, clientInfo) {
    var transactionStart, transactionId, payload, _response4, _error$response2;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          transactionStart = Date.now();
          transactionId = Math.floor(Math.random() * 100000000).toString();
          transactionLogger(transactionId, 'Initialisation paiement Maishapay', {
            amount: amount,
            phone: phone,
            operator: operator,
            clientInfo: clientInfo
          });
          payload = {
            transactionReference: transactionId,
            gatewayMode: "1",
            publicApiKey: process.env.MAISHAPAY_PUBLIC_KEY,
            secretApiKey: process.env.MAISHAPAY_SECRET_KEY,
            order: {
              amount: amount.toString(),
              currency: "USD",
              customerFullName: 'Client',
              customerEmailAdress: 'client@example.com'
            },
            paymentChannel: {
              channel: "MOBILEMONEY",
              provider: OPERATORS[operator].maishapay,
              walletID: phone,
              callbackUrl: "".concat(process.env.BASE_URL, "/api/maishapay-callback")
            }
          };
          _context13.prev = 4;
          transactionLogger(transactionId, 'Envoi requête à Maishapay', {
            payload: payload
          });
          _context13.next = 8;
          return _axios["default"].post("".concat(process.env.MAISHAPAY_API_URL, "/api/collect/v2/store/mobileMoney"), payload);
        case 8:
          _response4 = _context13.sent;
          transactionLogger(transactionId, 'Réponse Maishapay reçue', {
            status: 'SUBMITTED',
            responseData: _response4.data,
            duration: Date.now() - transactionStart
          });
          return _context13.abrupt("return", {
            status: 'SUBMITTED',
            transactionId: transactionId,
            paymentUrl: "".concat(process.env.BASE_URL, "/payment-result?transactionId=").concat(transactionId)
          });
        case 13:
          _context13.prev = 13;
          _context13.t0 = _context13["catch"](4);
          transactionLogger(transactionId, 'Erreur API Maishapay', {
            error: ((_error$response2 = _context13.t0.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.data) || _context13.t0.message,
            status: 'FAILED',
            duration: Date.now() - transactionStart
          });
          return _context13.abrupt("return", {
            status: 'FAILED',
            transactionId: transactionId,
            paymentUrl: "".concat(process.env.BASE_URL, "/payment-result?transactionId=").concat(transactionId)
          });
        case 17:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[4, 13]]);
  }));
  return _initiateMaishapayPayment.apply(this, arguments);
}
var pawapayCallback = exports.pawapayCallback = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, event, data, transactionId;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, event = _req$body2.event, data = _req$body2.data;
          transactionId = (data === null || data === void 0 ? void 0 : data.depositId) || 'UNKNOWN';
          _context2.prev = 2;
          transactionLogger(transactionId, 'Callback reçu de Pawapay', {
            event: event,
            callbackData: data
          });
          if (!(event === 'deposit.success' && data.status === 'COMPLETED')) {
            _context2.next = 10;
            break;
          }
          _context2.next = 7;
          return _mysql["default"].query("UPDATE orders SET \n                status = 'PAY\xC9E',\n                transaction_id = ?,\n                payment_date = NOW()\n                WHERE transaction_id = ? OR \n                (status = 'PENDING' AND amount = ?)", [data.depositId, data.depositId, data.amount.value]);
        case 7:
          transactionLogger(transactionId, 'Paiement complété avec succès');
          _context2.next = 14;
          break;
        case 10:
          if (!(event === 'deposit.failed')) {
            _context2.next = 14;
            break;
          }
          _context2.next = 13;
          return _mysql["default"].query("DELETE FROM orders \n                WHERE transaction_id = ? OR \n                (status = 'PENDING' AND amount = ?)", [data.depositId, data.amount.value]);
        case 13:
          transactionLogger(transactionId, 'Paiement échoué', {
            status: data.status
          });
        case 14:
          res.status(200).send('OK');
          _context2.next = 21;
          break;
        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](2);
          transactionLogger(transactionId, 'Erreur traitement callback Pawapay', {
            error: _context2.t0.message,
            stack: _context2.t0.stack
          });
          res.status(500).send('Error');
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 17]]);
  }));
  return function pawapayCallback(_x10, _x11) {
    return _ref2.apply(this, arguments);
  };
}();
var getTransactionStatus = exports.getTransactionStatus = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var transactionId, checkStart, _yield$pool$query, _yield$pool$query2, order, status, _response, _response2;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          transactionId = req.query.transactionId;
          checkStart = Date.now();
          _context3.prev = 2;
          transactionLogger(transactionId, 'Début vérification statut');
          _context3.next = 6;
          return _mysql["default"].query("SELECT status FROM orders WHERE transaction_id = ?", [transactionId]);
        case 6:
          _yield$pool$query = _context3.sent;
          _yield$pool$query2 = _slicedToArray(_yield$pool$query, 1);
          order = _yield$pool$query2[0];
          if (!((order === null || order === void 0 ? void 0 : order.status) === 'PAYÉE')) {
            _context3.next = 12;
            break;
          }
          transactionLogger(transactionId, 'Statut trouvé en base de données', {
            status: 'COMPLETED',
            duration: Date.now() - checkStart
          });
          return _context3.abrupt("return", res.json({
            status: 'COMPLETED'
          }));
        case 12:
          if (!(process.env.MAISHAPAY_ENABLED === '1')) {
            _context3.next = 21;
            break;
          }
          transactionLogger(transactionId, 'Vérification statut Maishapay');
          _context3.next = 16;
          return _axios["default"].get("".concat(process.env.MAISHAPAY_API_URL, "/api/collect/v2/transaction/").concat(transactionId, "/status"), {
            headers: {
              'Authorization': "Bearer ".concat(process.env.MAISHAPAY_SECRET_KEY)
            }
          });
        case 16:
          _response = _context3.sent;
          status = _response.data.transactionStatus === 'SUCCESS' ? 'COMPLETED' : 'PENDING';
          transactionLogger(transactionId, 'Réponse Maishapay', {
            apiStatus: _response.data.transactionStatus,
            determinedStatus: status
          });
          _context3.next = 34;
          break;
        case 21:
          _context3.prev = 21;
          transactionLogger(transactionId, 'Vérification statut Pawapay');
          _context3.next = 25;
          return _axios["default"].get("".concat(process.env.PAWAPAY_API_URL, "/deposits/").concat(transactionId), {
            headers: {
              'Authorization': "Bearer ".concat(process.env.PAWAPAY_API_KEY)
            }
          });
        case 25:
          _response2 = _context3.sent;
          status = _response2.data.status === 'COMPLETED' ? 'COMPLETED' : 'PENDING';
          transactionLogger(transactionId, 'Réponse Pawapay', {
            apiStatus: _response2.data.status,
            determinedStatus: status
          });
          _context3.next = 34;
          break;
        case 30:
          _context3.prev = 30;
          _context3.t0 = _context3["catch"](21);
          transactionLogger(transactionId, 'Erreur vérification statut Pawapay', {
            error: _context3.t0.message,
            fallbackStatus: 'PENDING'
          });
          status = 'PENDING';
        case 34:
          transactionLogger(transactionId, 'Statut final déterminé', {
            status: status,
            duration: Date.now() - checkStart
          });
          res.json({
            status: status
          });
          _context3.next = 42;
          break;
        case 38:
          _context3.prev = 38;
          _context3.t1 = _context3["catch"](2);
          transactionLogger(transactionId, 'Erreur vérification statut', {
            error: _context3.t1.message,
            stack: _context3.t1.stack,
            duration: Date.now() - checkStart
          });
          res.status(500).json({
            error: _context3.t1.message
          });
        case 42:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 38], [21, 30]]);
  }));
  return function getTransactionStatus(_x12, _x13) {
    return _ref3.apply(this, arguments);
  };
}();
var getPaymentResultPage = exports.getPaymentResultPage = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var filePath;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          try {
            filePath = _path["default"].join(__dirname, 'payment_result.html');
            _fs["default"].readFile(filePath, 'utf8', function (err, data) {
              if (err) {
                transactionLogger('SYSTEM', 'Erreur lecture fichier HTML', {
                  error: err.message,
                  filePath: filePath
                });
                return res.status(500).send('Erreur interne');
              }
              res.send(data);
            });
          } catch (e) {
            transactionLogger('SYSTEM', 'Erreur page résultat', {
              error: e.message,
              stack: e.stack
            });
            res.status(500).send('Erreur serveur');
          }
        case 1:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getPaymentResultPage(_x14, _x15) {
    return _ref4.apply(this, arguments);
  };
}();

// ... [Vos autres fonctions existantes restent inchangées] ...

setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
  var _yield$pool$query3, affectedRows;
  return _regeneratorRuntime().wrap(function _callee5$(_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        _context5.prev = 0;
        _context5.next = 3;
        return _mysql["default"].query("DELETE FROM orders \n            WHERE status = 'PENDING' \n            AND created_at < DATE_SUB(NOW(), INTERVAL 1 DAY)");
      case 3:
        _yield$pool$query3 = _context5.sent;
        affectedRows = _yield$pool$query3.affectedRows;
        transactionLogger('SYSTEM', 'Nettoyage des transactions expirées', {
          deletedCount: affectedRows
        });
        _context5.next = 11;
        break;
      case 8:
        _context5.prev = 8;
        _context5.t0 = _context5["catch"](0);
        transactionLogger('SYSTEM', 'Erreur nettoyage transactions', {
          error: _context5.t0.message
        });
      case 11:
      case "end":
        return _context5.stop();
    }
  }, _callee5, null, [[0, 8]]);
})), 3600000);

// Les autres fonctions restent inchangées
var getOrdersByStatus = exports.getOrdersByStatus = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req) {
    var res,
      ordersdb,
      _args6 = arguments;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          res = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : _express.response;
          _context6.prev = 1;
          _context6.next = 4;
          return _mysql["default"].query("CALL SP_ALL_ORDERS_STATUS(?);", [req.params.statusOrder]);
        case 4:
          ordersdb = _context6.sent;
          res.json({
            resp: true,
            msg: 'Orders by ' + req.params.statusOrder,
            ordersResponse: ordersdb[0]
          });
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](1);
          return _context6.abrupt("return", res.status(500).json({
            resp: false,
            msg: _context6.t0
          }));
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 8]]);
  }));
  return function getOrdersByStatus(_x16) {
    return _ref6.apply(this, arguments);
  };
}();
var getDetailsOrderById = exports.getDetailsOrderById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req) {
    var res,
      detailOrderdb,
      _args7 = arguments;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          res = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : _express.response;
          _context7.prev = 1;
          _context7.next = 4;
          return _mysql["default"].query("CALL SP_ORDER_DETAILS(?);", [req.params.idOrderDetails]);
        case 4:
          detailOrderdb = _context7.sent;
          res.json({
            resp: true,
            msg: 'Order details by ' + req.params.idOrderDetails,
            detailsOrder: detailOrderdb[0]
          });
          _context7.next = 11;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](1);
          return _context7.abrupt("return", res.status(500).json({
            resp: false,
            msg: _context7.t0
          }));
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 8]]);
  }));
  return function getDetailsOrderById(_x17) {
    return _ref7.apply(this, arguments);
  };
}();
var updateStatusToDispatched = exports.updateStatusToDispatched = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req) {
    var res,
      _req$body3,
      idDelivery,
      idOrder,
      _args8 = arguments;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          res = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : _express.response;
          _context8.prev = 1;
          _req$body3 = req.body, idDelivery = _req$body3.idDelivery, idOrder = _req$body3.idOrder;
          _context8.next = 5;
          return _mysql["default"].query('UPDATE orders SET status = ?, delivery_id = ? WHERE id = ?', ['ATTRIBUÉE', idDelivery, idOrder]);
        case 5:
          res.json({
            resp: true,
            msg: 'Commande attribuée'
          });
          _context8.next = 11;
          break;
        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](1);
          return _context8.abrupt("return", res.status(500).json({
            resp: false,
            msg: _context8.t0
          }));
        case 11:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 8]]);
  }));
  return function updateStatusToDispatched(_x18) {
    return _ref8.apply(this, arguments);
  };
}();
var getOrdersByDelivery = exports.getOrdersByDelivery = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req) {
    var res,
      ordersDeliverydb,
      _args9 = arguments;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          res = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : _express.response;
          _context9.prev = 1;
          _context9.next = 4;
          return _mysql["default"].query("CALL SP_ORDERS_BY_DELIVERY(?,?);", [req.uid, req.params.statusOrder]);
        case 4:
          ordersDeliverydb = _context9.sent;
          res.json({
            resp: true,
            msg: 'All Orders By Delivery',
            ordersResponse: ordersDeliverydb[0]
          });
          _context9.next = 11;
          break;
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](1);
          return _context9.abrupt("return", res.status(500).json({
            resp: false,
            msg: _context9.t0
          }));
        case 11:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 8]]);
  }));
  return function getOrdersByDelivery(_x19) {
    return _ref9.apply(this, arguments);
  };
}();
var updateStatusToOntheWay = exports.updateStatusToOntheWay = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req) {
    var res,
      _req$body4,
      latitude,
      longitude,
      _args10 = arguments;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          res = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : _express.response;
          _context10.prev = 1;
          _req$body4 = req.body, latitude = _req$body4.latitude, longitude = _req$body4.longitude;
          _context10.next = 5;
          return _mysql["default"].query('UPDATE orders SET status = ?, latitude = ?, longitude = ? WHERE id = ?', ['EN ROUTE', latitude, longitude, req.params.idOrder]);
        case 5:
          res.json({
            resp: true,
            msg: 'Commande en route'
          });
          _context10.next = 11;
          break;
        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](1);
          return _context10.abrupt("return", res.status(500).json({
            resp: false,
            msg: _context10.t0
          }));
        case 11:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 8]]);
  }));
  return function updateStatusToOntheWay(_x20) {
    return _ref10.apply(this, arguments);
  };
}();
var updateStatusToDelivered = exports.updateStatusToDelivered = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req) {
    var res,
      _args11 = arguments;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          res = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : _express.response;
          _context11.prev = 1;
          _context11.next = 4;
          return _mysql["default"].query('UPDATE orders SET status = ? WHERE id = ?', ['LIVRÉE', req.params.idOrder]);
        case 4:
          res.json({
            resp: true,
            msg: 'Commande livrée'
          });
          _context11.next = 10;
          break;
        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](1);
          return _context11.abrupt("return", res.status(500).json({
            resp: false,
            msg: _context11.t0
          }));
        case 10:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[1, 7]]);
  }));
  return function updateStatusToDelivered(_x21) {
    return _ref11.apply(this, arguments);
  };
}();