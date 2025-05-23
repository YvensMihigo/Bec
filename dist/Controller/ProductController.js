"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateStatusProduct = exports.searchProductsForCategory = exports.searchProductForName = exports.listProductsAdmin = exports.likeProduct = exports.getProductsTopHome = exports.getLikes = exports.getImagesProducts = exports.deleteProduct = exports.addNewProduct = void 0;
var _express = require("express");
var _mysql = _interopRequireDefault(require("../Database/mysql"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Récupérer le nombre de "likes" d'un produit
var getLikes = exports.getLikes = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req) {
    var res,
      productId,
      _yield$pool$query,
      _yield$pool$query2,
      rows,
      likes,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          res = _args.length > 1 && _args[1] !== undefined ? _args[1] : _express.response;
          _context.prev = 1;
          productId = req.params.id; //console.log(`Fetching likes for product ID: ${productId}`);
          _context.next = 5;
          return _mysql["default"].query('SELECT likes FROM products WHERE id = ?', [productId]);
        case 5:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = _slicedToArray(_yield$pool$query, 1);
          rows = _yield$pool$query2[0];
          //console.log('Query result:', rows);
          //console.log('Query result structure:', JSON.stringify(rows, null, 2)); // Inspectez la structure
          // Si `rows` est un objet unique, accédez directement à `rows.likes`
          likes = rows === null || rows === void 0 ? void 0 : rows.likes;
          if (!(likes === undefined)) {
            _context.next = 11;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            resp: false,
            msg: 'Produit non trouvé ou propriété "likes" manquante'
          }));
        case 11:
          res.json({
            resp: true,
            msg: 'Nombre de likes récupéré',
            likes: likes
          });
          _context.next = 17;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", res.status(500).json({
            resp: false,
            msg: _context.t0.message
          }));
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 14]]);
  }));
  return function getLikes(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Incrémenter le nombre de "likes" d'un produit
var likeProduct = exports.likeProduct = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req) {
    var res,
      productId,
      _yield$pool$query3,
      _yield$pool$query4,
      product,
      currentLikes,
      newLikes,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          res = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : _express.response;
          _context2.prev = 1;
          productId = req.params.id; // Récupérer le produit
          _context2.next = 5;
          return _mysql["default"].query('SELECT likes FROM products WHERE id = ?', [productId]);
        case 5:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = _slicedToArray(_yield$pool$query3, 1);
          product = _yield$pool$query4[0];
          if (!(!product || product.length === 0)) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            resp: false,
            msg: 'Produit non trouvé'
          }));
        case 10:
          // Accéder directement à la propriété `likes`
          currentLikes = product.likes; // Utilisez `product.likes` au lieu de `product[0].likes`
          // Incrémenter le nombre de "likes"
          newLikes = currentLikes + 1;
          _context2.next = 14;
          return _mysql["default"].query('UPDATE products SET likes = ? WHERE id = ?', [newLikes, productId]);
        case 14:
          res.json({
            resp: true,
            msg: 'Like ajouté avec succès',
            likes: newLikes
          });
          _context2.next = 20;
          break;
        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](1);
          return _context2.abrupt("return", res.status(500).json({
            resp: false,
            msg: _context2.t0.message
          }));
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 17]]);
  }));
  return function likeProduct(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

// Vos autres méthodes existantes
var addNewProduct = exports.addNewProduct = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req) {
    var res,
      _req$body,
      name,
      description,
      price,
      category,
      rows,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          res = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : _express.response;
          _context3.prev = 1;
          _req$body = req.body, name = _req$body.name, description = _req$body.description, price = _req$body.price, category = _req$body.category;
          _context3.next = 5;
          return _mysql["default"].query('INSERT INTO products (nameProduct, description, price, category_id) VALUE (?,?,?,?)', [name, description, price, category]);
        case 5:
          rows = _context3.sent;
          req.files.forEach(function (image) {
            _mysql["default"].query('INSERT INTO imageProduct (picture, product_id) value (?,?)', [image.filename, rows.insertId]);
          });
          res.json({
            resp: true,
            msg: 'Product added Successfully'
          });
          _context3.next = 13;
          break;
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", res.status(500).json({
            resp: false,
            msg: _context3.t0
          }));
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 10]]);
  }));
  return function addNewProduct(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var getProductsTopHome = exports.getProductsTopHome = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req) {
    var res,
      productsdb,
      _args4 = arguments;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          res = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : _express.response;
          _context4.prev = 1;
          _context4.next = 4;
          return _mysql["default"].query("CALL SP_GET_PRODUCTS_TOP();");
        case 4:
          productsdb = _context4.sent;
          res.json({
            resp: true,
            msg: 'Top 10 Products',
            productsdb: productsdb[0]
          });
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          return _context4.abrupt("return", res.status(500).json({
            resp: false,
            msg: _context4.t0
          }));
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 8]]);
  }));
  return function getProductsTopHome(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var getImagesProducts = exports.getImagesProducts = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req) {
    var res,
      imageProductdb,
      _args5 = arguments;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          res = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : _express.response;
          _context5.prev = 1;
          _context5.next = 4;
          return _mysql["default"].query('SELECT * FROM imageProduct WHERE product_id = ?', [req.params.id]);
        case 4:
          imageProductdb = _context5.sent;
          res.json({
            resp: true,
            msg: 'Get Images Products',
            imageProductdb: imageProductdb
          });
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          return _context5.abrupt("return", res.status(500).json({
            resp: false,
            msg: _context5.t0
          }));
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function getImagesProducts(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
var searchProductForName = exports.searchProductForName = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req) {
    var res,
      productdb,
      _args6 = arguments;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          res = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : _express.response;
          _context6.prev = 1;
          _context6.next = 4;
          return _mysql["default"].query("CALL SP_SEARCH_PRODUCT(?);", [req.params.nameProduct]);
        case 4:
          productdb = _context6.sent;
          res.json({
            resp: true,
            msg: 'Search products',
            productsdb: productdb[0]
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
  return function searchProductForName(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
var searchProductsForCategory = exports.searchProductsForCategory = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req) {
    var res,
      productdb,
      _args7 = arguments;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          res = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : _express.response;
          _context7.prev = 1;
          _context7.next = 4;
          return _mysql["default"].query("CALL SP_SEARCH_FOR_CATEGORY(?);", [req.params.idCategory]);
        case 4:
          productdb = _context7.sent;
          res.json({
            resp: true,
            msg: 'list Products for id Category',
            productsdb: productdb[0]
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
  return function searchProductsForCategory(_x7) {
    return _ref7.apply(this, arguments);
  };
}();
var listProductsAdmin = exports.listProductsAdmin = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req) {
    var res,
      productsdb,
      _args8 = arguments;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          res = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : _express.response;
          _context8.prev = 1;
          _context8.next = 4;
          return _mysql["default"].query("CALL SP_LIST_PRODUCTS_ADMIN();");
        case 4:
          productsdb = _context8.sent;
          res.json({
            resp: true,
            msg: 'Top 10 Products',
            productsdb: productsdb[0]
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
  return function listProductsAdmin(_x8) {
    return _ref8.apply(this, arguments);
  };
}();
var updateStatusProduct = exports.updateStatusProduct = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req) {
    var res,
      _req$body2,
      status,
      idProduct,
      _args9 = arguments;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          res = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : _express.response;
          _context9.prev = 1;
          _req$body2 = req.body, status = _req$body2.status, idProduct = _req$body2.idProduct;
          _context9.next = 5;
          return _mysql["default"].query('UPDATE products SET status = ? WHERE id = ?', [parseInt(status), parseInt(idProduct)]);
        case 5:
          res.json({
            resp: true,
            msg: 'Product updated'
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
  return function updateStatusProduct(_x9) {
    return _ref9.apply(this, arguments);
  };
}();
var deleteProduct = exports.deleteProduct = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req) {
    var res,
      _args10 = arguments;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          res = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : _express.response;
          _context10.prev = 1;
          _context10.next = 4;
          return _mysql["default"].query('DELETE FROM imageProduct WHERE product_id = ?', [req.params.idProduct]);
        case 4:
          _context10.next = 6;
          return _mysql["default"].query('DELETE FROM products WHERE id = ?', [req.params.idProduct]);
        case 6:
          res.json({
            resp: true,
            msg: 'Product deleted successfully'
          });
          _context10.next = 12;
          break;
        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10["catch"](1);
          return _context10.abrupt("return", res.status(500).json({
            resp: false,
            msg: _context10.t0
          }));
        case 12:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 9]]);
  }));
  return function deleteProduct(_x10) {
    return _ref10.apply(this, arguments);
  };
}();