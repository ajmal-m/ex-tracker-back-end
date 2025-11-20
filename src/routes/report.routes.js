const express = require("express");
const router = express.Router();
const {getCategoryWiseData} = require("../controllers/report.controller");
const {authMiddleware} = require("../middleware/auth.middleware");

router.get("/category-wise", authMiddleware, getCategoryWiseData);

module.exports = router;