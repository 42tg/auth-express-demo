const express = require('express');
const router = express.Router();
const passport = require('passport')

const jwt = require('jsonwebtoken')

router.post('/',  function (req, res) {
    passport.authenticate( 'local',
      { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
        session: false
      },
      (err, user, info) => {
        if(err || !user){
          return res.status(400).json({
            message: 'Authentication failed!',
            error: err,
            url: '/login'
          })
        }
        req.login(user, {session : false}, (err) => {
          if(err) res.send(err)
          const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {expiresIn : '1h'})
          return res.json({user: { _id: user._id, username: user.username}, token})
        })
      }
      )(req,res)
})

router.get('/', (req, res) => {
  return res.status(400).json({
    message: 'No Post found!',
    url: '/login'
  })
})
module.exports = router
