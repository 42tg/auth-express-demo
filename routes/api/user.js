const express = require('express');
const router = express.Router();

const User = require('../../models/User')

router.get('/', (req, res) => {
  User.find().then(items => res.json(items))
})

router.post('/', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  })
  newUser.save()
    .then(user => {
        res.status(201).json({
          _id: user._id,
          username: user.username,
        })
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      })
    })
})

module.exports = router;
