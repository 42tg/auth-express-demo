const express = require('express');
const router = express.Router();
const passport = require('passport')

const jwt = require('jsonwebtoken')

router.post('/',  function (req, res) {
    passport
      .authenticate(
        'local',
        { successRedirect: '/',
          failureRedirect: '/login',
          failureFlash: true,
          session: false
        },
        (err, user, info) => {
          if(err || !user){
            return res.status(400).json({
              message: 'Authentication failed!',
              error: erry,
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
  res.send(`
    <html lang="de">
    <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>Login</title></head>
    <body>
    <form action="/login" method="post">
    <div>
        <label>Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Log In"/>
    </div>
    </form>
    </body>
    </html>`
  )
})
module.exports = router
