//DEPENDENCIES
const express = require("express");
const budgets = express.Router();

//ROUTES
budgets.get("/", (req, res) => {
    res.send("Hey the index route works!");
});

budgets.post("/", (req, res) => {
    res.send(req.body);
});

budgets.put("/:id", (req, res) => {
    res.send("The update route works, but doesn't do anything yet.");
});

budgets.delete("/:id", (res, res) => {
    res.send("The delete route works, but doesn't do anything yet.")
})

//EXPORTS
module.exports = budgets