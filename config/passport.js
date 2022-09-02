const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const Owner = require("../models/owner");

// passport.use() is called when the use logs in using OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    function (accessToken, refreshToken, profile, cb) {
      Owner.findOne({ googleId: profile.id }, function (err, owner) {
        if (err) return cb(err);
        if (owner) {
          return cb(null, owner);
        } else {
          // Add new owner via Oauth if we don't have in database
          var newOwner = new Owner({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
          newOwner.save(function (err) {
            if (err) return cb(err);
            return cb(null, newOwner);
          });
        }
      });
    }
  )
);

// serializeUser() is used in order to set up the session
passport.serializeUser(function (owner, done) {
  done(null, owner.id);
});

// deserializeUser() is called every time request comes in from an existing logged in user
passport.deserializeUser(function (id, done) {
  Owner.findById(id, function (err, owner) {
    done(err, owner);
  });
});
