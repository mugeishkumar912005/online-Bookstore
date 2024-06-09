const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const USER = new mongoose.Schema({
    userid: {
        type: String,
        default: uuidv4,
    },
    Name: String,
    Ph_no: Number,
    Email: String,
    PassWord: String,
    MyCollections: [{
        Book_img: String,
        Book_Name: String,
        Author_Name: String,
        Rate: Number,
        Catagory: String,
        Ratings: Number,
    }]
});

module.exports = { USER };
