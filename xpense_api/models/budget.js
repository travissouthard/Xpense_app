const mongoose = require('mongoose')

const budgetSchema = mongoose.Schema({
    title: {type: String, required: true},
    budget: {type: Number, default: 0},
    spent: {type: Number, default: 0},
    transactions: {type: String},
})

module.exports = mongoose.model('Budget', budgetSchema)