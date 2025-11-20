const mongoose = require("mongoose");
const {Schema} = mongoose;

const expenseSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    expense:{
        type: Number,
        required: true,
        min: 0,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },

    year: {
      type: Number,
      required: true,
      min: 2000,
    },
},  { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);