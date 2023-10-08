const {Schema, model} = require('mongoose')

const Currency = new Schema({
    value: {type: Number, required: true}
})

module.exports = model('Currency', Currency)