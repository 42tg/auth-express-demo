const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})

const config = {}
config.local = new LocalStrategy(
  {
    passReqToCallback: true,
  },
  function(req, username, password, done) {
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err)
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err)
        if (isMatch) return done(null, user, { message: 'LoggedIn' })
      })
    })
  }
)

module.exports = config
