const winston = require('winston')
const express = require('express')
const error = require('./middleware/error')
const app = express()
const user = require('./routes/user');
const party = require('./routes/party');
const EnterPartyReq = require('./routes/enterPartyRequest')
const cors = require('cors')

require('./startup/logging')


app.use(express.json());
app.use(cors())
app.use('/api/user', user);
app.use('/api/party', party);
app.use('/api/EnterPartyReq', EnterPartyReq)
app.use(error);


const port = process.env.PORT || 3001;
app.listen(port, () => winston.info(`connected on ${port}`))

