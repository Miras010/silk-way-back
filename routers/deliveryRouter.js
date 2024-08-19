const Router = require('express')
const DeliveryController = require('../controllers/deliveryController')
const roleMiddleware = require('./../middleware/roleMiddleware')
const {check} = require("express-validator");

const deliveryRequestRouter = new Router()

deliveryRequestRouter.get('/getAll', roleMiddleware(['ADMIN']), DeliveryController.getAll)
deliveryRequestRouter.post('/create', DeliveryController.createRequestByUser)
deliveryRequestRouter.put('/update', roleMiddleware(['ADMIN', 'USER']), DeliveryController.update)
deliveryRequestRouter.get('/getUsersRequests', roleMiddleware(['ADMIN', 'USER']), DeliveryController.getUsersRequests)

module.exports = deliveryRequestRouter
