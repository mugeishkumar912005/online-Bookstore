const M = require('mongoose');

const ModeBL = new M.Schema({
    Book_img:String,
    Book_Name:String,
    Author_Name:String,
    Rate:Number,
    Catagory:String,
    Ratings:Number,
    Stock:Number
});
module.exports = { ModeBL };