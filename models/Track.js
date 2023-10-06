const {Schema, model, ObjectId} = require('mongoose')

const Track = new Schema({
    trackNumber: {type: String, required: true, unique: true},
    fileName: String,
    receivedInChinaDate: Date,
    receivedInAktobeDate: Date,
    fromChinaToAktobe: Date,
    receivedByClient: Date,
    shippedFromAktobeDate: Date,
    passedTheBorder: Date,
    createdDate: {type: Date, default: Date.now, required: true},
    createdBy: {type: ObjectId, required: true, ref: 'User'},
})

module.exports = model('Track', Track)
