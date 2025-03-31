"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socketOrderDelivery = void 0;
var socketOrderDelivery = exports.socketOrderDelivery = function socketOrderDelivery(io) {
  var nameSpaceOrders = io.of('/orders-delivery-socket');
  nameSpaceOrders.on('connection', function (socket) {
    console.log('USER CONECTED');
    socket.on('position', function (data) {
      // console.log(`DATA FLUTTER ${JSON.stringify(data)}`);

      nameSpaceOrders.emit("position/".concat(data.idOrder), {
        latitude: data.latitude,
        longitude: data.longitude
      });
    });
    socket.on('disconnect', function (data) {
      console.log('USER DISCONNECT');
    });
  });
};