"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mysql = _interopRequireDefault(require("mysql"));
var _util = require("util");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var pool = _mysql["default"].createPool({
  host: '127.0.0.1',
  // ou '127.0.0.1'
  user: 'root',
  password: 'root',
  // Par défaut, MAMP n'a pas de mot de passe root
  database: 'frave_food',
  port: 8889,
  // Ajout du port MAMP
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  // Ajout du socket
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
pool.getConnection(function (err, connection) {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') console.log('DATABASE CONNECTION WAS CLOSED');
    if (err.code === 'ER_CON_COUNT_ERROR') console.log('DATABASE HAS TO MANY CONNECTIONS');
    if (err.code === 'ECONNREFUSED') console.log('DATABASE CONNECTION WAS REFUSED');
  }
  if (connection) connection.release();
  console.log('DataBase is connected to ' + process.env.DB_DATABASE);
  return;
});
pool.query = (0, _util.promisify)(pool.query);
var _default = exports["default"] = pool;