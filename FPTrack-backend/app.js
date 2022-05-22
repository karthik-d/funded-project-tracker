var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Connect DB and Seed
var db = require('./db/connect');
//var _ = require('./init/seed_db');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var proposalRouter = require('./routes/proposal');
var resourceGroupRouter = require('./routes/resource_group');
var resourceRouter = require('./routes/resource');

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

app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/proposal', proposalRouter);
app.use('/api/resource-group', resourceGroupRouter);
app.use('/api/resource', resourceRouter);


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
