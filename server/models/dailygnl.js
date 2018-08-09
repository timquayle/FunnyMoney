const mongoose = require('mongoose');

const UserDailyNetGnLSchema = new mongoose.Schema({
userid: {type: String, required: [true, "user id is required"]},    
symbol: {type: String, required: [true, "Symbol is required"]},
netgnl: {type: Number, required: [true, "Gain and Loss value is required"]},
date: {type: String, required: [true, "Date is required"]},
},{timestamps: true })
mongoose.model('DailyGnL', UserDailyNetGnLSchema); 
const Stocks = mongoose.model('DailyGnL') 
module.exports = mongoose.model("DailyGnL");