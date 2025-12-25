const express = require("express");
const router = express.Router();
const {getCategories, editCategory, deleteCategory , addCategory} = require("../controllers/category.controller");

router.get("/", getCategories);
router.post('/create' ,  addCategory);
router.put('/',  editCategory);
router.delete('/' , deleteCategory);

module.exports = router;