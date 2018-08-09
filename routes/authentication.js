const jwt = require('jsonwebtoken')

const User = require('../models/User')

module.exports = () => {
  return function (req, res, next) {
    if(!req.token) return res.status(401).json({ message: 'Authentication required!', url: '/login' })
    return jwt.verify(req.token, process.env.JWT_SECRET, function(err, decoded) {
      if(err) return res.status(401).json({ message: 'Authentication required!', url: '/login' })
      return next()
    });
  }
}
