const User = require("../models/user.model");

module.exports.getUsers = async  () => {
    try {
        const users = await User.find({});
        res.status(200).json({
            message:"data retericed successfully",
            data: users
        });
    } catch (error) {
        res.status(200).json({
            message:"Error In Message"
        });
        
    }
};