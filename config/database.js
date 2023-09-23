const { error } = require("console");
const mongoose = require("mongoose");
require("dotenv").config();
exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        userUnifiedTopology: true,
    })
    .then(() => console.log("DB is connected Sucessfully"))
    .catch((error) => {
        console.log("DB connected faild");
        console.error(error);
        process.exit(1);
    })
};