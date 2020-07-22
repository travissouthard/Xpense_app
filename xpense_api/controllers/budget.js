//DEPENDENCIES
const express = require("express");
const budgets = express.Router();

const Budget = require("../models/budget.js")

//ROUTES
budgets.get("/", (req, res) => {
    Budget.find({}, (err, foundBudgets) => {
        if (err) {
            res.status(400).json({"Error": err.message});
        }
        res.status(200).json(foundBudgets);
    });
});

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
    })
});

budgets.delete("/:id", (res, res) => {
    Budget.findByIdAndDelete(req.params.id, (err, deletedBudget) => {
        if (err) {
            res.status(400).json({"Error": err.message});
        }
        res.status(200).json(deletedBudget);
    })
})

//EXPORTS
module.exports = budgets