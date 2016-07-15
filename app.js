var express       = require('express'),
    app           = express(),
    path          = require('path'),
    favicon       = require('serve-favicon'),
    logger        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    passport      = require('passport'),
    flash         = require('connect-flash'),
    mongoose      = require('mongoose'),
    session       = require('express-session');

var dbConfig = require('./config/db');

//connecting to DB
mongoose.connect(dbConfig.url);

//handling mongoose events on connect to DB
mongoose.connection.once('Connected', function(){
  console.log('Db Connected');
});
mongoose.connection.on('error', function(err){
  console.log('Unable to connect to DB', err);
});

//bootstrap models
require('./models/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

// use flash middleware provided by connect-flash to store message in session
app.use(flash());

app.use(session({
  secret: 'abcdef12345', 
  resave: true, //forces session to be saved back to session store no matter if session modify during req
  saveUninitialized: false  //forces session to be saved to store even if session is uninitialized(new but not modified session)
}));
//app.use(session({secret: 'abcdef12345', cookie: {}}));
app.use(passport.initialize());
app.use(passport.session());

//initializing passport
require('./passport')(passport);

//using passport in routes
var routes = require('./routes/index')(passport);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/*// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});*/


module.exports = app;
