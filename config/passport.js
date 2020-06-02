const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Capper = mongoose.model('cappers');
const keys = require('./keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new jwtStrategy(options, (jwt_payload, done) => {
    switch (jwt_payload.type) {
      case 'user':
        User.findById(jwt_payload.id)
          .then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
        break
      case 'capper':
        Capper.findById(jwt_payload.id)
          .then(capper => {
            if (capper) {
              return done(null, capper);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
        break
    }
  }))
}