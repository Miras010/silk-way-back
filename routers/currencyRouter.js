const Router = require('express')
const currencyRouter = new Router()
const CurrencyController = require('../controllers/currencyController')

currencyRouter.get('/getAll', CurrencyController.getAll)
currencyRouter.get('/getLatest', CurrencyController.getLatest)
currencyRouter.post('/create', CurrencyController.addCurrencyValue)

module.exports = currencyRouter