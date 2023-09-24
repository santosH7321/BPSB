const mangoose = require("mongoose");

const ratingAndReviewsSchema = new mangoose.Schema({
    user: {
        type:mangoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    rating:{
        type:Number,
        required:true,

    },
    review:{
        type:String,
        required:true
    },
});

module.exports = mangoose.model("RatingAndReview", ratingAndReviewsSchema);