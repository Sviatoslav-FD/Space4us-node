const express = require('express')
const cors = require('cors')
const app = express()
const port = 7777
const mongoose = require('mongoose')

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

app.options('/*', (_, res) => {
  res.sendStatus(200);
});

const tasksRouter = require('./routes/tasks')
const countriesRouter = require('./routes/countries')
const wordsRouter = require('./routes/words')
const authRouter = require('./routes/auth')
const notesRouter = require('./routes/notes')
const projectsRouter = require('./routes/projects')
const interviewRouter = require('./routes/interview')


app.use('/tasks', tasksRouter)
app.use('/countries', countriesRouter)
app.use('/words', wordsRouter)
app.use('/auth', authRouter)
app.use('/notes', notesRouter)
app.use('/projects', projectsRouter)
app.use('/interview', interviewRouter)

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
}
)
process.on('unhandledRejection', function (err) {
  console.log('Unhandled rejection: ' + err);
}
)

app.listen(port, () => console.log(`Space 4 us app listening on port ${port}`))

const uri = "mongodb+srv://sviatoslavpanevnyk:hLTEOkqaA6J3XRuB@cluster0.napgf3x.mongodb.net/space4us?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
    