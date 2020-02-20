const winston = require('winston')
const express = require('express')
const error = require('./middleware/error')
const auth = require('./middleware/auth')
const app = express()
const user = require('./routes/user');
const party = require('./routes/party');

require('./startup/logging')



app.use(express.json());
app.use('/api/user', user);
app.use('/api/party', party);

app.use(error);


const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`connected on ${port}`))

