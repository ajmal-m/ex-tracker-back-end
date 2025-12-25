const express = require("express");
const router = express.Router();
const { createExpense, getExpense ,deleteExpense , updateExpense} = require("../controllers/expense.controller");
const {authMiddleware} = require("../middleware/auth.middleware");

router.get("/", authMiddleware,  getExpense);
router.post("/create", authMiddleware , createExpense );
router.put("/" , authMiddleware,  updateExpense);
router.delete("/", authMiddleware, deleteExpense);


module.exports =router;