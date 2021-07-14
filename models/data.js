const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required:true
    }
},{timestamps: true});

const Data = mongoose.model("Data",dataSchema);

module.exports = Data;