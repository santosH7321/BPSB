const mongoose = require("mangoose");

const courseSchema = new mangooes.Schema({
    courseName: {
        type:String,

    },
    courseDescription: {
        type:String,

    },
    instructor: {
        type: mangoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    whatYouWillLearn: {
        type:String,

    },
    courseContant: [
        {
            type: mangooes.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    ratingAndReviews: [
        {
            type: mangooes.Schema.Types.ObjectId,
            ref:"RatingAndReview",
        }
    ],
    price: {
        type:Number,

    },
    thumbnail: {
        type:String,

    },
    tag: {
        type:mangooes.Schema.Types.ObjectId,
        ref:"Tag",
    },
    studentEnrolled: [{
        type:mangooes.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    }]
});

    module.exports = mangoose.model("Course",courseSchema);

    