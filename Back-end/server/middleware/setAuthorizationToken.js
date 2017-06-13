'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = setAuthorizationToken = function setAuthorizationToken(token) {
  if (token) {
    _axios2.default.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    delete _axios2.default.defaults.headers.common['Authorization'];
  }
};