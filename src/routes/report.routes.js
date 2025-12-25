const express = require("express");
const router = express.Router();
const {getCategoryWiseData} = require("../controllers/report.controller");

router.get("/category-wise", getCategoryWiseData);

module.exports = router;