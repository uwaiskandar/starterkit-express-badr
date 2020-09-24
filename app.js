var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./app/routes/index');
var usersRouter = require('./app/routes/users');
var swaggerOptions = require('./config/swagger');
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const expressSwagger = require('express-swagger-generator')(app);
expressSwagger(swaggerOptions)

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.json({ message: '404' });
  // next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  res.json({ error: err });
});

app.listen(3000, function () {
  console.log("Express server listening on port 3000");
});

module.exports = app;
