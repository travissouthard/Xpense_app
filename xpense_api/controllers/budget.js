//DEPENDENCIES
const express = require("express");
const budgets = express.Router();

const Budget = require("../models/budget.js");
const budget = require("../models/budget.js");
// const budgetSeed = require("../models/budget_seed.js")

//ROUTES
budgets.get("/", (req, res) => {
    Budget.find({}, (err, foundBudgets) => {
        if (err) {
            res.status(400).json({"Error": err.message});
        }
        res.status(200).json(foundBudgets);
    });
});

//Seed value for road trip presets
budgets.get("/seed", (req, res) => {
    let categoryNames = ["Gas", "Food", "Lodging", "Entertainment", "Shopping", "Car rental", "Misc.",];
    let categories = [];
    categoryNames.map((name) => {
        categories.push({
            title: name,
            budget: 0,
            spent: 0,
            transactions: [],
        });
    });
    Budget.create(categories, (err, seededBudget) => {
        if (err) {
            res.status(400).json({"Error": err.message});
        }
        res.status(200).json(seededBudget)
    })
})

//Create new budget category
budgets.post("/", (req, res) => {
    Budget.create(req.body, (err, createdBudget) => {
        if (err) {
            res.status(400).json({"Error": err.message});
        }
        res.status(200).json(createdBudget);
    });
});

//Add transaction route
budgets.put("/:category", async (req, res) => {
    let foundBudget = await Budget.findOne({title: req.params.category});
    foundBudget.transactions.push(req.body);
    await foundBudget.save();
    res.status(200).json(foundBudget);
});

//update budget value
budgets.put('/:id', (req, res) => {
    Budget.findByIdAndUpdate(req.params.id, {$set: {budget: req.body}}, (err, updatedBudget) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(updatedBudget);
    })
})

//delete transactions
budgets.put("/:category/:index", async (req, res) => {
    let foundBudget = await Budget.findOne({title: req.params.category});
    foundBudget.transactions.splice(req.params.index, 1);
    await foundBudget.save();
    res.status(200).json(foundBudget);
})

//delete budget category
budgets.delete("/:id", (req, res) => {
    Budget.findByIdAndDelete(req.params.id, (err, deletedBudget) => {
        if (err) {
            res.status(400).json({"Error": err.message});
        }
        res.status(200).json(deletedBudget);
    });
});

//EXPORTS
module.exports = budgets