const M = require('mongoose');

const ModeBL = new M.Schema({
    //DB Schema
    Book_img:String,
    Book_Name:String,
    Author_Name:String,
    Rate:Number,
    Catagory:String,
    Ratings:Number,
    Stock:Number
});
//Module Export
module.exports = { ModeBL };