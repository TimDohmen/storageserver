var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Advice'

var schema = new Schema({
  complete: { type: Boolean, required: true, default: false },
  description: { type: String, required: true },
  user: { type: String },
}, { timestamps: true })

module.exports = mongoose.model(schemaName, schema)
