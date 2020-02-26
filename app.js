const winston = require('winston')
const express = require('express')
const error = require('./middleware/error')
const app = express()
const user = require('./routes/user');
const party = require('./routes/party');
const EnterPartyReq = require('./routes/enterPartyRequest')
require('./startup/logging')
const db = require('./database/models/index')


app.use(express.json());
app.use('/api/user', user);
app.use('/api/party', party);
app.use('/api/EnterPartyReq', EnterPartyReq)
app.use(error);


const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`connected on ${port}`))

