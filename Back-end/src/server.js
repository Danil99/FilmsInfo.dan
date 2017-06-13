import express from 'express';
import bodyParser from 'body-parser';

import headers from './middleware/headers.js';

import login from './middleware/login.js';
import verify from './middleware/verify.js';
import editSett from './middleware/editSett.js';

import users from './users.js';

let app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(headers);

app.post('/login', login);
app.post('/verify', verify);

app.put('/editSett', editSett)

app.listen(8080, () => {
  console.log('Server is started');
})
