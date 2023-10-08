const Currency = require('../models/Currency')

class CurrencyController {

    async getAll (req, res) {
        try {
            const data = await Currency.find({})
            res.status(200).json(data)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getLatest (req, res) {
        try {
            const data = await Currency.find().sort({ _id: -1 }).limit(10)
            res.status(200).json(data)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async addCurrencyValue (req, res) {
        try {
            const { value } = req.body
            const data = await Currency.create({ value })
            res.status(200).json(data)
        } catch (e) {
            res.status(500).json(e)
        }
    }

}

module.exports = new CurrencyController()