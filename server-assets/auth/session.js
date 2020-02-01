var expressSession = require("express-session")
var mongoStore = require("connect-mongodb-session")(expressSession)

// THIS IS WHERE SESSIONS ARE BEING HELD WITHIN SERVER
var store = new mongoStore({
    uri: "mongodb://student:student@ds119078.mlab.com:19078/nightclass-music",
    collection: "Sessions"
});

// IF THERE IS AN ERROR GETTING THE SESSION
store.on("error", function(err) {
    console.log("[SESSION ERROR]", err);
})

// SESSION CONSTRUCTOR/GUIDELINE
var session = expressSession({
    secret: "nightclass-music",
    cookie: {
        maxAge: (1000 * 60 * 60 * 24 * 7) * 52 
    },
    store,
    resave: true,
    saveUninitialized: true

})

module.exports = session;