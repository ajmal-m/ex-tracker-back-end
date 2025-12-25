const mongoose = require("mongoose");
const {Schema} = mongoose;

const CategoryModal = new Schema({
  id:{
    type: Schema.Types.ObjectId,
    ref:"Category",
    required:true
  },
  name: {
    type:String,
    required:true
  }
});

const budgetSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    categoryId: CategoryModal,
    limit: {
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

module.exports = mongoose.model("Budget", budgetSchema);