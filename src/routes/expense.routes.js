const express = require("express");
const router = express.Router();
const { createExpense, getExpense ,deleteExpense , updateExpense} = require("../controllers/expense.controller");

router.get("/",  getExpense);
router.post("/create" , createExpense );
router.put("/" ,  updateExpense);
router.delete("/", deleteExpense);


module.exports =router;