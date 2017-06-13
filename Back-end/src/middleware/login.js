import jwt from 'jsonwebtoken';
import config from './config.js';

import users from '../users.js';

module.exports = function (req, res) {
  let user = users.find(user => user.username === req.body.username && user.password === req.body.password);
  if(user) {
    const token = jwt.sign({
      username: req.body.username,
      password: req.body.password
    }, config.jwtSecret)
    res.json({token});
  } else res.send('error');
}
