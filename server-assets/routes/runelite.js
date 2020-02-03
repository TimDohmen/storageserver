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
var hiScoreExt = axios.create({
  baseURL: 'https://secure.runescape.com/m=hiscore_oldschool',
  timeout: 8000
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
  let response = await hiScoreExt.get("index_lite.ws?player=" + req.body.name)
  res.send(response.data || response.error)
})




module.exports = router