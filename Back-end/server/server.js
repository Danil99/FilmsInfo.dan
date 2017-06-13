'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _headers = require('./middleware/headers.js');

var _headers2 = _interopRequireDefault(_headers);

var _login = require('./middleware/login.js');

var _login2 = _interopRequireDefault(_login);

var _verify = require('./middleware/verify.js');

var _verify2 = _interopRequireDefault(_verify);

var _editSett = require('./middleware/editSett.js');

var _editSett2 = _interopRequireDefault(_editSett);

var _users = require('./users.js');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use(_headers2.default);

app.post('/login', _login2.default);
app.post('/verify', _verify2.default);

app.put('/editSett', _editSett2.default);

app.listen(8080, function () {
  console.log('Server is started');
});