const Advice = require('../models/Advice.js')

var router = require('express').Router()
var axios = require('axios')

var ext = axios.create({
  baseURL: 'https://api.adviceslip.com/advice',
  timeout: 3000
})

router.get('/api/advice', async (req, res, next) => {
  let response = await ext.get("")
  res.send(response.data)
})

router.post('/api/:user/advice', async (req, res, next) => {
  req.body.user = req.params.user
  Advice.create(req.body)
    .then(advice => {
      res.send(advice)
    })
    .catch(next)
})

router.get('/api/:user/advice', async (req, res, next) => {
  req.body.user = req.params.user
  Advice.find({ user: req.params.user })
    .then(advice => {
      res.send(advice)
    })
    .catch(next)
})

module.exports = router
