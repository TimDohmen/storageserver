let express = require("express"),
  bp = require("body-parser"),
  cors = require("cors"),
  server = express(),
  session = require('./server-assets/auth/session')

var port = process.env.PORT || 3000;
require("./server-assets/db/mlab-config");

let authRoutes = require('./server-assets/auth/routes')
//auth
//no auth
let runelite = require('./server-assets/routes/runelite')




var whitelist = ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:8083']
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhiteListed = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhiteListed);
  },
  credentials: true
}

server.use(cors())
server.use(session)
server.use(bp.json())
server.use(bp.urlencoded({ extended: true }))

server.use(authRoutes);

//Your routes here

server.post('/api/*', (req, res, next) => {
  delete req.body._id
  next()
})

server.use('/api/:name', (req, res, next) => {
  let user = req.params.name.toLowerCase()
  if (user.includes('yourname')) {
    return res.status(401).send({ message: "[API ERROR] Invalid request please specify your name", status: 401 })
  }
  next()
})



server.use(runelite)




server.use("*", (error, req, res, next) => {
  res.status(400).send({ error: { message: error.message } });
});

server.listen(port, () => {
  console.log("the server is running... Port:", port);
});