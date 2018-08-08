const express = require('express');
const router = express.Router();
const passport = require('passport')

router.post('/', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }))
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
