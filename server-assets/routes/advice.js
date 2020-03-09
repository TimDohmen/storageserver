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

module.exports = router
