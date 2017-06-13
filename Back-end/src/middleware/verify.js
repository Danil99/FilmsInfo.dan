import jwt from 'jsonwebtoken';
import config from './config.js';
import users from '../users.js';

module.exports = function (req, res, next) {
  jwt.verify(req.body.token, config.jwtSecret, function (err, decoded) {
    if(err !== null) {
      res.send('The token is not verify')
      next();
    } else {
      let user = users.find(user => user.username === decoded.username && user.password === decoded.password);
      if(user) res.send(user);
      if(!user) res.send('The token is not verify')
    }
  })
}
