const {Schema, model, ObjectId} = require('mongoose')

const DeliveryRequest = new Schema({
    userId: {type: ObjectId, ref: 'User'},
    address: {type: String, required: true},
    clientName: {type: String, required: true},
    clientCode: {type: String, required: true},
    apartment: {type: String},
    floor: {type: Number},
    entrance: {type: Number},
    phoneNumber: {type: String},
    status: { type: String, default: 'NEW' },
    description: {type: String},
    createdDate: {type: Date, default: Date.now },
    deliveryDate: {type: Date }
})

module.exports = model('DeliveryRequest', DeliveryRequest)
