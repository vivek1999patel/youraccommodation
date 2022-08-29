var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});
// google OAuth Login route
router.get('/auth/google', passport.authenticate(
  'google',
  {scope: ['profile', 'email']}
))
// google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/owners',
    failureRedirect: '/owners'
  }
))
// log out router
router.get('/logout', function(req, res) {
  req.logout(function(err) {
    res.render('index')
  })
})

module.exports = router;
