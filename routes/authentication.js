module.exports = () => {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.status(401).json({
      message: 'Authentication required!',
      url: '/login'
    })
  }
}
