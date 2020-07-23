//DEPENDENCIES
const express = require("express");
const budgets = express.Router();

const Budget = require("../models/budget.js")
const budgetSeed = require("../models/budget_seed.js")

//ROUTES
budgets.get("/", (req, res) => {
    Budget.find({}, (err, foundBudgets) => {
        if (err) {
            res.status(400).json({"Error": err.message});
        }
        res.status(200).json(foundBudgets);
    });
});

budgets.get("/seed/:id", (req, res) => {
    budgetSeed.userId = req.params.id;
    Budget.create(budgetseed, (err, seededBudget) => {
        if (err) {
            res.status(400).json({"Error": err.message});
        }
        res.status(200).json(seededBudget)
    })
})

budgets.post("/", (req, res) => {
    Budget.create(req.body, (err, createdBudget) => {
        if (err) {
            res.status(400).json({"Error": err.message});
        }
        res.status(200).json(createdBudget);
    });
});

budgets.put("/:id", (req, res) => {
    Budget.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedBudget) => {
        if (err) {
            res.status(400).json({"Error": err.message});
        }
        res.status(200).json(updatedBudget);
    });
});

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