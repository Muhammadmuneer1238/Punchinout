const mongoose = require("mongoose");


const punchSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    tasks: [String],
    punchInTime: {
        type: Date
    },
    punchOutTime:
    {
        type: Date
    },
    completed: [String],
    checked: {
        type: Boolean,
        default: true

    }

});

const PunchActivity = mongoose.model("PunchActivity", punchSchema);

module.exports = PunchActivity;
