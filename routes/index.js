var express = require('express');
var router = express.Router();

module.exports = function(passport) {
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', {title: 'Welcome'});
  });

  /* GET home page. */
  router.get('/home', function(req, res, next) {
    res.render('home', {title: 'Welcome to home'});
  });

  /* GET login page. */
  router.get('/login', function(req, res, next) {
    res.render('login', { message: req.flash('message') });
  });

  /* Handle login page. */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash:    true
  }));

  /* GET register page. */
  router.get('/register', function(req, res, next) {
    res.render('register', { message: req.flash('message') });
  })

  /* Handle register page. */
  router.post('/register', passport.authenticate('register', {
    successRedirect: '/home',
    failureRedirect: '/register',
    failureFlash:    true
  }));

  /* Handle logout */
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  return router;
};
