'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _users = require('../users.js');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, res) {
  var user = _users2.default.find(function (user) {
    return user.username === req.body.username && user.password === req.body.password;
  });
  if (user) {
    var token = _jsonwebtoken2.default.sign({
      username: req.body.username,
      password: req.body.password
    }, _config2.default.jwtSecret);
    res.json({ token: token });
  } else res.send('error');
};