const DB = require('mongoose');
const S = require('express');
const P = require('body-parser');
const Cors = require('cors');
const { ModeBL } = require('./blschema.js');
const { USER } = require('./userSchema.js');
const { v4: uuidv4 } = require('uuid'); 

const App = S();
const Port = process.env.PORT || 5000;

App.use(Cors());
App.use(P.json());

const Books = DB.model('Books', ModeBL);
const User = DB.model('User', USER);

async function connecttoDB() {
    try {
        await DB.connect('mongodb+srv://kmugeis2005:dontforgetit@mugeishhero.ggr3iod.mongodb.net/BookLib?retryWrites=true&w=majority&appName=mugeishhero');
        console.log("DB Connection Success");
    } catch (error) {
        console.log("Error:" + error)
    }
}
connecttoDB();
App.get('/all', async (request, response) => {
    try {
        const Abook = await Books.find();
        response.status(200).json(Abook);
    } catch (error) {
        response.status(404).json({ "msg": "Oops! Something went wrong" });
    }
});

App.get('/:Catagory', async (request, response) => {
    const Catagory = request.params.Catagory;
    try {
        const books = await Books.find({ Catagory }).sort({ Ratings: -1 });
        response.status(200).json(books);
    } catch (error) {
        response.status(500).json({
            status: 'failure',
            message: `Not able to fetch books for category ${Catagory}`,
            error: error.message
        });
    }
});

App.get('/Top', async (request, response) => {
    try {
        const TopC = await Books.find({ Ratings: { $gt: 4.5 } });
        response.status(200).json({ TopC });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

App.post('/addUser', async (request, response) => {
    try {
        const { Name, Ph_no, Email, PassWord } = request.body;
        const userid = uuidv4(); 
        const newUser = await User.create({ userid, Name, Ph_no, Email, PassWord });
        response.status(200).json({ 'Msg': 'Success', 'userid': userid }); 
    } catch (error) {
        response.status(401).json({ 'Msg': 'Oops! something went wrong', 'error': error });
    }
});


App.post('/Login', async (request, response) => {
    const { Name, PassWord } = request.body;
    try {
        const user = await User.findOne({ Name, PassWord });
        if (user) {
            console.log('User found:', user); 
            response.json({ 'msg': "success", 'userid': user.userid });
        } else {
            response.status(401).json({ 'msg': "Invalid credentials", 'msg1': "No such user exists" });
        }
    } catch (error) {
        response.status(500).json({ 'msg': "Internal server error", 'error': error });
    }
});

App.post('/AddtoColl/:userid', async (request, response) => {
    try {
        const userId = request.params.userid;
        const user = await User.findOne({ userid: userId });
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }
        const { Book_img, Book_Name, Author_Name, Rate, Catagory, Ratings } = request.body;
        const newBook = { Book_img, Book_Name, Author_Name, Rate, Catagory, Ratings };
        user.MyCollections.push(newBook);
        await user.save();
        response.status(200).json({ "msg": "Book added to collection" });
    } catch (error) {
        response.status(500).json({ 'msg': "Internal server error", 'error': error.message });
    }
});
App.get('/MyCollection/:userid', async (request, response) => {
    try {
        const userId = request.params.userid;
        const user = await User.findOne({ userid: userId });
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }
        response.status(200).json(user.MyCollections);
    } catch (error) {
        response.status(500).json({ 'msg': "Internal server error", 'error': error.message });
    }
});

App.delete('/RemoveFromColl/:userid/:bookid', async (request, response) => {
    try {
        const userId = request.params.userid;
        const bookId = request.params.bookid;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }
        user.MyCollections = user.MyCollections.filter(book => book._id !== bookId);
        await user.save();
        response.status(200).json({ "msg": "Book removed from collection" });
    } catch (error) {
        response.status(500).json({ 'msg': "Internal server error", 'error': error.message });
    }
});

App.get('/latestUserID', async (request, response) => {
    try {
        const latestUser = await User.findOne().sort({ userid: -1 });
        const latestUserID = latestUser ? latestUser.userid : 0;
        response.json({ latestUserID });
    } catch (error) {
        console.error('Error retrieving latest user ID:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});

App.listen(Port, () => {
    console.log("Server Started in port");
});
