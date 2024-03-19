const mongoose = require('mongoose');
// const { ModelBL } = require('./Books.js'); // Corrected import

const USER = new mongoose.Schema({
    userid:Number,
    Name: String,
    Ph_no: Number,
    Email: String,
    PassWord: String,
    MyCollections:[{
    Book_img:String,
    Book_Name:String,
    Author_Name:String,
    Rate:Number,
    Catagory:String,
    Rating:Number,
    }]
});

// Module Export
module.exports = { USER };
