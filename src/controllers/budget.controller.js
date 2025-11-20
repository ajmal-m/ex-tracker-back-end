const Budget = require("../models/budget.model");

exports.getBudgets = async(req, res)=> {
    try {
        const {month, year} = req.query;
        const userId = req.user.id;

        if (!month || !year) {
            return res.status(400).json({ message: "Month and year are required" });
        }

        const budgets = await Budget.find({
            userId,
            month,
            year
        }).populate("categoryId");

        res.status(200).json({
            message: "Budgets retrieved successfully.",
            budgets
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.createBudget = async(req, res) => {
    try {

        const { categoryId, limit , month, year } = req.body;
        const userId = req.user.id;

        if (!categoryId || limit == null || !month || !year) {
            return res.status(400).json({ message: "All fields are required: categoryId, limit, month, year" });
        }


        // Check already exist 
        const existingBudget = await Budget.findOne({
            userId,
            categoryId,
            month,
            year
        });


        if(existingBudget){
            return res.status(400).json({ message: "This category already has a budget for the selected month and year" });
        }

        // Create Budget
        const budget = await Budget.create({
            userId,
            categoryId,
            limit,
            month,
            year,
        });

        res.status(201).json({
            message: "Budget created successfully",
            budget,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.updateBudget = async(req, res) => {
    try {
        const { categoryId, limit , month, year , id } = req.body;
        const userId = req.user.id;

        // Check budget exist for category in same month & year
        const existingBudget = await Budget.findOne({
            userId,
            categoryId,
            month,
            year
        });

        if(existingBudget){
            return res.status(400).json({ message: "This category already has a budget for the selected month and year" });
        }

        const updatedBudget = await Budget.findOneAndUpdate(
            { userId , _id : id  },
            { 
                categoryId,
                limit,
                month,
                year
            },
            {
                new : true
            }
        );

        if (!updatedBudget) {
            return res.status(404).json({ message: "Budget not found or not authorized" });
        }
        res.status(200).json({
            message:"Budget updated successfully.",
            budget: updatedBudget
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};



exports.deleteBudget = async(req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.query;
        const result = await Budget.deleteOne({
            _id: id,
            userId : userId
        });
        if(result.deletedCount === 0){
            return res.status(404).json({ message: "Budget not found or not authorized" });
        }
        res.status(200).json({
            message: "Budget deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}