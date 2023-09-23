const mongoose = require("mongoose");

const courseProgress = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
    completedVideos: [
        {
            type:mangoose.Schema.Types.ObjectId,
            ref:SubSection,
        }
    ],
});

    module.exports = mongoose.model("CourseProgress", courseProgress);