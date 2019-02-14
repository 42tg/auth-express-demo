const express = require('express')
const router = express.Router()
const passport = require('passport')

const jwt = require('jsonwebtoken')

router.all('/', function(req, res) {
  //TODO: Put Token on blacklist...
  res.json({
    destroyed: true,
    token: req.token,
  })
})

module.exports = router
