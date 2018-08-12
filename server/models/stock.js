const mongoose = require('mongoose');

const StocksSchema = new mongoose.Schema({
    
symbol: {type: String, required: [true, "Title is required"]},
buyprice: {type: Number, required: [true, "Price is required"]},
amount: {type: Number, required: [true, "Description is required"]},
userid: {type: String, required: [true, "user id is required"]},
sname: {type: String}
},{timestamps: true })
mongoose.model('Stocks', StocksSchema); 
const Stocks = mongoose.model('Stocks') 
module.exports = mongoose.model("Stocks");