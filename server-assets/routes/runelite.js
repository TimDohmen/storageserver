var router = require('express').Router()
var axios = require('axios')

var ext = axios.create({
  baseURL: 'http://services.runescape.com',
  timeout: 3000
})
var itemExt = axios.create({
  baseURL: 'https://raw.githubusercontent.com/tanlines/powerbot-scripts/master/items_useful_data.json',
  timeout: 3000
})
var newExt = axios.create({
  baseURL: 'https://secure.runescape.com',
  timeout: 6000
})
router.get('/api/runelite/:id', async (req, res, next) => {
  let response = await ext.get("m=itemdb_oldschool/api/catalogue/detail.json?item=" + req.params.id)
  res.send(response.data)
})
router.get('/api/runelite', async (req, res, next) => {
  let response = await itemExt.get()
  res.send(response.data)
})
router.put('/api/runelite/hiscore', async (req, res, next) => {
  let response = await ext.get("m=hiscore_oldschoolindex_lite.ws?player=" + req.body.name)
  res.send(response.data)
})




module.exports = router