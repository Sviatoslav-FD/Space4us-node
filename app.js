const express = require('express')
const cors = require('cors')
const app = express()
const port = 7777

app.use(cors())
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

const taskManagerRouter = require('./routes/task-manager')
const countriesRouter = require('./routes/countries')

app.use('/tasks', taskManagerRouter)
app.use('/countries', countriesRouter)

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
}
)
process.on('unhandledRejection', function (err) {
  console.log('Unhandled rejection: ' + err);
}
)

app.listen(port, () => console.log(`Space 4 us app listening on port ${port}`))