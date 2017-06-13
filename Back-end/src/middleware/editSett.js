import jwt from 'jsonwebtoken';
import config from './config.js';

import users from '../users.js';

module.exports = function (req, res) {
  jwt.verify(req.body.token, config.jwtSecret, function (err, decoded) {
    if(err !== null) {
      res.send('The token is not verify')
      next();
    } else {
      let user = users.find(user => user.username === decoded.username && user.password === decoded.password);
      if(user.username !== req.body.username || user.password !== req.body.password) {
        const token = jwt.sign({
          username: req.body.username,
          password: req.body.password
        }, config.jwtSecret);
        user.username = req.body.username || user.username;
        user.password = req.body.password || user.password;
        user.image = req.body.image || user.image;
        user.email = req.body.email || user.email;
        res.json({token});
      } else if(user.username === req.body.username || user.password === req.body.password) {
        user.username = req.body.username || user.username;
        user.password = req.body.password || user.password;
        user.image = req.body.image || user.image;
        user.email = req.body.email || user.email;

        res.sendStatus(200);
      }
    }
  })
}
