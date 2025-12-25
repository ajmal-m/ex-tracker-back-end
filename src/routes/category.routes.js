const express = require("express");
const router = express.Router();
const {getCategories, editCategory, deleteCategory , addCategory} = require("../controllers/category.controller");
const {authMiddleware} = require("../middleware/auth.middleware");

router.get("/", authMiddleware, getCategories);
router.post('/create' , authMiddleware,  addCategory);
router.put('/', authMiddleware,  editCategory);
router.delete('/', authMiddleware , deleteCategory);

module.exports = router;