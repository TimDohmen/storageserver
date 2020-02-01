var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcryptjs')
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'User'
const SALT_FACTOR = 10;

var schema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: {type: String, required: true, unique: true}
})

schema.statics.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR))
}

schema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password) 
}


module.exports = mongoose.model(schemaName, schema)
