"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var product = _interopRequireWildcard(require("../Controller/ProductController"));
var _Multer = require("../Lib/Multer");
var _ValidateToken = require("../Middleware/ValidateToken");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = (0, _express.Router)();

// Endpoint pour récupérer le nombre de "likes" d'un produit
router.get('/products/:id/likes', _ValidateToken.verifyToken, product.getLikes);

// Endpoint pour incrémenter le nombre de "likes" d'un produit
router.post('/products/:id/like', _ValidateToken.verifyToken, product.likeProduct);

// Vos autres routes existantes
router.post('/add-new-products', [_ValidateToken.verifyToken, _Multer.upLoadsProducts.array('image')], product.addNewProduct);
router.get('/get-products-top-home', _ValidateToken.verifyToken, product.getProductsTopHome);
router.get('/get-images-products/:id', _ValidateToken.verifyToken, product.getImagesProducts);
router.get('/search-product-for-name/:nameProduct', _ValidateToken.verifyToken, product.searchProductForName);
router.get('/search-product-for-category/:idCategory', _ValidateToken.verifyToken, product.searchProductsForCategory);
router.get('/list-porducts-admin', _ValidateToken.verifyToken, product.listProductsAdmin);
router.put('/update-status-product', _ValidateToken.verifyToken, product.updateStatusProduct);
router["delete"]('/delete-product/:idProduct', _ValidateToken.verifyToken, product.deleteProduct);
var _default = exports["default"] = router;