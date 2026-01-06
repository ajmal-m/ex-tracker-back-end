const { Types } = require("mongoose");
const Expense = require("../models/expense.model");

exports.getExpense = async (req, res) => {
    try {
        const userId = '691f328a7515a02207b6e796';
        const { month, year , categoryId } = req.query;
        if(!month ||!year){
            return res.status(400).json({
                message: "month, year are required."
            });
        }

        const query = {
            userId: userId,
            month : Number(month),
            year : Number(year)
        }

        if(categoryId){
            query = { ...query, categoryId};
        }
        const expenses = await Expense.find(query).populate("categoryId");

        res.status(200).json({
            expenses,
            message: "Expenses retrieved successfully.",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.createExpense = async (req, res) => {
    try {
        const {  month, year, expense , day} = req.body;
        const userId = '691f328a7515a02207b6e796';
        const categoryId = '694cdfb5949d5c6bcb50f89c';

        if (!categoryId || !month || !year || !expense || ! day) {
            return res.status(400).json({
                message: "Category, month, year, day and expense  are required."
            });
        }

        const newExpense = await Expense.create({
            userId,
            categoryId,
            month,
            year,
            expense,
            day
        });

        res.status(201).json({
            message: "Expense created successfully.",
            expenses : newExpense
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}


exports.updateExpense = async(req, res) => {
    try {
        const { categoryId , month, year, expense , id} = req.body;
        const userId = req.user.id;

        if (!categoryId || !month || !year || !expense || id) {
            return res.status(400).json({
                message: "Category, month, year, and expense are required."
            });
        }

        const updatedExpense = await Expense.findOneAndUpdate(
            {
                _id: id,
                userId
            },
            {
                categoryId,
                month,
                year,
                expense
            },
            {
                new: true
            }
        );

        if(!updatedExpense){
             return res.status(404).json({ message: "Expense not found or not authorized" });
        }

        res.status(200).json({
            message:"Expense updated successfully.",
            expense: updatedExpense
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.query;

        if(!id){
            return res.status(400).json({
                message:"Expense is Required"
            });
        }

        const result = await Expense.deleteOne({
            userId,
            _id: id
        });

        if(result.deletedCount === 0){
           return res.status(404).json({  message: "Expense not found or you are not authorized to delete it." });
        }
        res.status(200).json({
            message: "Expense deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}