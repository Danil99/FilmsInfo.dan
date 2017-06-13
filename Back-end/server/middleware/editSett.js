'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _users = require('../users.js');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, res) {
  _jsonwebtoken2.default.verify(req.body.token, _config2.default.jwtSecret, function (err, decoded) {
    if (err !== null) {
      res.send('The token is not verify');
      next();
    } else {
      var user = _users2.default.find(function (user) {
        return user.username === decoded.username && user.password === decoded.password;
      });
      if (user.username !== req.body.username || user.password !== req.body.password) {
        var token = _jsonwebtoken2.default.sign({
          username: req.body.username,
          password: req.body.password
        }, _config2.default.jwtSecret);
        user.username = req.body.username || user.username;
        user.password = req.body.password || user.password;
        user.image = req.body.image || user.image;
        user.email = req.body.email || user.email;
        res.json({ token: token });
      } else if (user.username === req.body.username || user.password === req.body.password) {
        user.username = req.body.username || user.username;
        user.password = req.body.password || user.password;
        user.image = req.body.image || user.image;
        user.email = req.body.email || user.email;

        res.sendStatus(200);
      }
    }
  });
};