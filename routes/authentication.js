const jwt = require('jsonwebtoken')

const User = require('../models/User')

module.exports = () => {
  return function (req, res, next) {
    const token = req.headers.bearer
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(err) return res.status(401).json({ message: 'Authentication required!', url: '/login' })

      User.find(decoded.id).then(user => next())
    });
  }
}
