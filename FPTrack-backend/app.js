var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');

dotenv.config();

// Connect DB and Seed
var db = require('./db/connect');
//var _ = require('./init/seed_db');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var proposalRouter = require('./routes/proposal');
var resourceGroupRouter = require('./routes/resource_group');
var resourceRouter = require('./routes/resource');
var projectRouter = require('./routes/project')
// <<<<<<< HEAD
var resourceAssignmentRouter = require('./routes/resource_assignment');
// =======
// >>>>>>> 8ef04d9992f6a449617d22334dbf60719305c3a5
var authRouter = require('./routes/auth');

var app = express();

// set request limit
app.use(express.json({ limit: '20mb' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* Routing */

// Pre-functor for allow Cross Origin Requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return next();
})

// Normal routes
app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/proposal', proposalRouter);
app.use('/api/resource-group', resourceGroupRouter);
app.use('/api/resource', resourceRouter);
// <<<<<<< HEAD
app.use('/api/resource-assignment', resourceAssignmentRouter);
// =======
// >>>>>>> 8ef04d9992f6a449617d22334dbf60719305c3a5
app.use('/api/project', projectRouter);
app.use('/api/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
