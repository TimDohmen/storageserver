var router = require("express").Router();
var Users = require("../models/user");

var errorMessage = { error: "Oops something broke." };

// REGISTER NEW USER
router.post('/auth/register', (req, res, next) => {
    if(!req.body.password){
        throw new Error("User validation failed: password: Path `password` is required.") 
    }
    req.body.password = Users.generateHash(req.body.password)
    Users.create(req.body)
        .then(user => {
            if (!user) {
                return res.status(401).send(errorMessage)
            }
            user.password = null; 
            req.session.uid = user._id 
            console.log("Succesfully Registered")
            res.send({ message: "Successfully created user", user })
        })
        .catch(err => res.status(401).send(err))
})

// LOGIN USER
router.post("/auth/login", (req, res) => {
    Users.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(401).send("Incorrect email or password")
        }
        if (!user.validatePassword(req.body.password)) {
            return res.status(401).send(err)
        }
        user.password = null
        req.session.uid = user._id

        res.send({ message: "Successfully logged in", user })
    })
    .catch(err => res.status(401).send(err))    
})

router.get('/auth/authenticate', (req, res) => {
    Users.findById(req.session.uid)
        .then(user => {
            if (!user) {
                return res.status(401).send({ error: "Please Login to Continue" })
            }
            user.password = null;
            return res.status(200).send(user)
        })
        .catch(err => {
            return res.status(500).send({
                err
            })
        })
})
router.delete('/auth/logout', (req, res) => {
    req.session.destroy()
    res.send("Successfully logged out")
})

module.exports = router;
