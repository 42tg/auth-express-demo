require('dotenv').config()
const express = require('express')
const moongose = require('mongoose')

const helmet = require('helmet')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('connect-flash')
const bearerToken = require('express-bearer-token')
const cors = require('cors')
const app = express()
const isAuthenticated = require('./routes/authentication')
///////////////////////////////////////////// CONFIGURE Middlewares
passport.use(require('./config/passport').local)

///////////////////////////////////////////// SETUP Middlewares
app.use(cors())
//app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(bearerToken())
app.use(flash())
///////////////////////////////////////////// SETUP Routes
app.get('/', function(req, res) {
  res.send('Hello World!')
})

const user = require('./routes/api/user')
app.use('/api/user', isAuthenticated(), user)
const login = require('./routes/login')
app.use('/login', login)
const logout = require('./routes/logout')
app.use('/logout', isAuthenticated(), logout)
///////////////////////////////////////////// CONFIGURE Server
const port = process.env.PORT || 8080

///////////////////////////////////////////// START Database
moongose
  .connect(
    require('./config/keys').mongoDb,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected!'))
  .catch(console.error)

///////////////////////////////////////////// START Server
app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
