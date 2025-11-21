const Expense = require("../models/expense.model");
const mongoose = require("mongoose");

exports.getCategoryWiseData = async (req, res) => {
    const userId = req.user.id;
    let {month, year} = req.query;
    console.log(typeof Number(month), year)
    try {
        const datas = await Expense.aggregate([

             {
                $match:{ 
                    month:Number(month),
                    year:Number(year),
                    userId:  new mongoose.Types.ObjectId(userId)
                }
             },
             {
                $group : {
                   _id: "$categoryId",
                   spend: { $sum: "$expense" },
                   count: { $sum: 1 },
                }
            },
            {
                $lookup: {
                    from: "budgets",
                    let: { catId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$categoryId", "$$catId"] },
                                        { $eq: ["$month", Number(month)] },
                                        { $eq: ["$year", Number(year)] },
                                        { $eq: ["$userId",  new mongoose.Types.ObjectId(userId)] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "budgetData"
                }
            },
            { $unwind: { path: "$budgetData", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    categoryId: "$_id",
                    spend: 1,
                    count: 1,
                    limit: "$budgetData.limit",
                    _id: 0
                }
            }
        ])
        res.status(200).json({ datas })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}