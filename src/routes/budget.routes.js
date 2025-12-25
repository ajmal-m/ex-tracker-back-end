const express = require("express");
const router = express.Router();
const {createBudget,updateBudget, deleteBudget , getBudgets} = require("../controllers/budget.controller");

router.get("/",  getBudgets);
router.post("/create" ,  createBudget);
router.put("/" , updateBudget);
router.delete("/"  , deleteBudget);


module.exports = router;