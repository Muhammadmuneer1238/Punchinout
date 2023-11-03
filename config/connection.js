const mongoose = require("mongoose");

const api = "mongodb+srv://muneer1238:hadiya@cluster0.kf1z5je.mongodb.net/PunchInOut";

const db=mongoose.connect(api).then(() => {
    console.log("Connected to the database");


}).catch((err) => {
    console.error("Error connecting to the database:", err);
});
module.exports=db