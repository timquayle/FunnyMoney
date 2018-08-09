const mongoose = require('mongoose');

const DailyTotalSchema = new mongoose.Schema({
    
symbol: {type: String, required: [true, "Title is required"]},
closeprice: {type: Number, required: [true, "Price is required"]},
date: {type: String, required: [true, "Date is required"]},
},{timestamps: true })
mongoose.model('Daily', DailyTotalSchema); 
const Stocks = mongoose.model('Daily') 
module.exports = mongoose.model("Daily");