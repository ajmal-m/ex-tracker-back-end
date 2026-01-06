const Category = require("../models/category.model");

exports.getCategories = async (req,res) => {
    try {
        const userId = "691f328a7515a02207b6e796";
        const categories  = await Category.find({ userId });
        res.status(200).json({
            categories ,
            message: "Categories retrieved successfully."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}


exports.addCategory = async (req, res) => {
    try {
        const { name} = req.body;
        const userId = req?.user?.id ?? 'undefined';

        if (!name || name.trim() === "") {
            return res.status(400).json({ message: "Category name is required" });
        }

        const newCategory = await Category.create({
            name : name.trim(),
        });

        res.status(201).json({
            message: "Category created successfully",
            category: newCategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.editCategory = async (req, res) => {
    try {
        const {name , id}= req.body;
        const userId = req.user.id;

        if (!name || name.trim() === "") {
            return res.status(400).json({ message: "Category name is required" });
        }
        
        const updatedCategory = await Category.findOneAndUpdate(
            { _id : id , userId : userId}, 
            { name: name.trim() }, 
            { new : true}
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found or not authorized" });
        }

        res.status(200).json({
           message: "Category updated successfully.",
            category : updatedCategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const userId = req.user.id;
        const {id} = req.query;
        const result = await Category.deleteOne({
            _id: id,
            userId : userId
        });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Category not found or not authorized" });
        }
        res.status(200).json({
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}