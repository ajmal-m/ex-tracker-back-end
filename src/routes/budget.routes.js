const express = require("express");
const router = express.Router();
const {createBudget,updateBudget, deleteBudget , getBudgets} = require("../controllers/budget.controller");
const {authMiddleware} = require("../middleware/auth.middleware");

router.get("/", authMiddleware,  getBudgets);
router.post("/create", authMiddleware ,  createBudget);
router.put("/", authMiddleware , updateBudget);
router.delete("/" , authMiddleware , deleteBudget);


module.exports = router;