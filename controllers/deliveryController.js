const DeliveryRequest = require('../models/DeliveryRequest')
const User = require('../models/User')
const DeliveryRequestService = require('../services/deliveryRequestService')
const jwt = require("jsonwebtoken");
const {secret} = require("../config");
const Track = require("../models/Track");
const UsersTrack = require("../models/UsersTrack");
const UserService = require("../services/userService");

class DeliveryController {

    async createRequestByUser (req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            let id = ''
            if (!token) {
                id = jwt.verify(token, secret)
            }
            const { address, apartment, floor, entrance, phoneNumber, description, clientCode, clientName } = req.body

            const data = { address, apartment, floor, entrance, phoneNumber, description, clientCode, clientName }
            if (id) {
                data['userId'] = id
            }
            const createdRequest = await DeliveryRequest.create(data)
            return res.status(200).json(createdRequest)

        } catch (e) {
            console.log('e', e)
            res.status(500).json(e)
        }
    }

    async getAll (req, res) {
        try {
            const { page = 1, limit = 10, status = 'NEW' } = req.query
            const response = await DeliveryRequestService.getAll({ page, limit, status })
            res.status(200).json(response)
        } catch (e) {
            console.log('e', e)
            res.status(500).json(e)
        }
    }

    async update (req, res) {
        try {
            const response = await DeliveryRequestService.update(req.body)
            res.status(200).json(response)
        } catch (e) {
            console.log('e', e)
            res.status(500).json(e)
        }
    }

    async getUsersRequests (req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(400).json({message: 'Не авторизован'})
            }
            const { id } = jwt.verify(token, secret)

            const user = await User.findById(id)
            if (!user) {
                return res.status(400).json({message: 'Пользователь не зарегистрирован'})
            }

            const result = await DeliveryRequest.find({ userId: id }).sort({ createdDate: -1 })
            res.status(200).json(result)

        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new DeliveryController()
