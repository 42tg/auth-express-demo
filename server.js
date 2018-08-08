require('dotenv').config()
const express = require('express')
const moongose = require('mongoose')

const helmet = require('helmet')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session');

const app = express()
const isAuthenticated = require('./routes/authentication')
///////////////////////////////////////////// CONFIGURE Middlewares
passport.use(require('./config/passport').local)

///////////////////////////////////////////// SETUP Middlewares

app.use(helmet())
app.use(session({ cookie: { maxAge: 60000 },
  secret: 'woot',
  resave: false,
  saveUninitialized: false}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());
///////////////////////////////////////////// SETUP Routes
app.get('/', function (req, res) {
  res.send('Hello World!')
});

const user = require('./routes/api/user')
app.use('/api/user', isAuthenticated(), user)
const login = require('./routes/login')
app.use('/login', login)
///////////////////////////////////////////// CONFIGURE Server
const port = process.env.PORT || 5000

///////////////////////////////////////////// START Database
moongose
  .connect(require('./config/keys').mongoDb,{ useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected!'))
  .catch(console.error)

///////////////////////////////////////////// START Server
app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})


