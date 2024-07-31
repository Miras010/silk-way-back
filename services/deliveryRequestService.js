const DeliveryRequest = require("../models/DeliveryRequest");
const bcrypt = require("bcryptjs");

class DeliveryRequestService {

    async getAll (params) {
        const { page, limit, status } = params

        const users = await DeliveryRequest.find({
            status
        })
            .populate('userId')
            .sort({ createdDate: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        const count = await DeliveryRequest.count({
            status
        })
        return {
            resp: users,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            currentPage: page
        }
    }

    async loadUsers (params) {
        const { globalFilter } = params
        let regex = ''
        if (globalFilter !== 'null') {
            regex = new RegExp(globalFilter, 'i')
        }
        const users = await User.find({
            username: {$regex: regex},
        })
            .exec()
        return users
    }

    async update (request) {
        if (!request._id) {
            throw new Error('Enter the id')
        }
        const updated = await DeliveryRequest.findByIdAndUpdate(request._id, request)
        return updated
    }

    async changePassword({_id, password}) {
        if (!_id) {
            throw new Error('Enter the id')
        }
        const hashedPassword = bcrypt.hashSync(password, 7);
        const updatedUser = await User.findByIdAndUpdate(_id, { password: hashedPassword }, {new: true})
        return updatedUser
    }
}

module.exports = new DeliveryRequestService()
