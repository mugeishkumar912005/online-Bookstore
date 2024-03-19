const DB=require('mongoose');
const S=require('express');
const P=require('body-parser');
const Cors=require('cors');
const {ModeBL}=require('./blschema.js');
const{USER}=require('./userSchema.js');
const Books=DB.model('Books',ModeBL);
const User=DB.model('User', USER);
const App=S();
App.use(P.json());
App.use(Cors());
const Port = process.env.PORT || 5000;
//atlas Connection
async function connecttoDB(){
    try{
        await DB.connect('mongodb+srv://kmugeis2005:dontforgetit@mugeishhero.ggr3iod.mongodb.net/BookLib?retryWrites=true&w=majority&appName=mugeishhero');
        console.log("DB Connection Success");
    }catch(error){
        console.log("Error:"+error)
    }
}
connecttoDB();

App.get('/all',async(request,response)=>{
  
    try{
          const Abook=await Books.find();
          response.status(200).json(Abook);
    }catch(error){
 response.status(404).json({
    "msg":"Oops!something Went wrong"
 })
    }
})
// Fetch books by category
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
  //Top-Rted
  App.get('/Top', async (request, response) => {
    try {
        const TopC = await Book.find({ Ratings: { $gt: 4.5 } });
        response.status(200).json({TopC});
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//adding users
// Add User

App.post('/addUser', async (request, response) => {
    try {
        const {userid, Name, Ph_no, Email, PassWord } = request.body;
        const newUser = await User.create({ 'userid':userid,'Name':Name, 'Ph_no':Ph_no, 'Email':Email, 'PassWord':PassWord });
        // newUser.save();
        response.status(200).json({
            'Msg': 'Success',
        });
    } catch (error) {
        response.status(401).json({
            'Msg': 'Oops! something went wrong',
            'error': error
        });
    }
});
//Authantication
App.post('/Login', async (request, response) => {
    const { Name, PassWord } = request.body;
    try {
        const user = await User.findOne({ Name, PassWord });
        if (user) {
            response.json({
                'msg': "success",
                'userid': user.userid
            });
        } else {
            response.status(401).json({
                'msg': "Invalid credentials",
                'msg1': "No such user exists"
            });
        }
    } catch (error) {
        response.status(500).json({
            'msg': "Internal server error",
            'error': error
        });
    }
});
App.get('/GetMycoll/:userid', async (request, response) => {
    try {
        const userId = request.params.userid;
        console.log("UserID:", userId);
        const user = await User.findOne({ userid: userId });
        console.log("User:", user);
        
        if (!user) {
            return response.status(404).json({"Msg": "User not found for ID: " + userId});
        }
        const MyCollections = user.MyCollections;
        response.status(200).json( MyCollections );
    } catch(error) {
        console.error("Error:", error);
        response.status(500).json({"Msg": "Internal server error"});
    }
});



App.post('/AddtoColl/:userid', async (request, response) => {
    try {
        const userId = request.params.userid; 
        const user = await User.findOne({ customIdentifierField: userId }); 

        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        const { Book_img,Book_Name, Author_Name, Rate, Catagory, Ratings } = request.body;

        const Data=user.MyCollections.push({
            Book_img,
            Book_Name,
            Author_Name,
            Rate,
            Catagory,
            Ratings
        });
        
        await user.save();

        response.status(200).json({
            "msg": "Collection Updated"
        });
    } catch (error) {
        response.status(500).json({
            'msg': "Internal server error",
            'error': error
        });
    }
});
//id
App.get('/latestUserID', async (request, response) => {
    try {
        const latestUser = await User.findOne().sort({ userid: -1 });
        if(!latestUser){
            latestUserID=0;
        }else{
            latestUserID=latestUser.userid;
        }
        response.json({ latestUserID });
    } catch (error) {
        console.error('Error retrieving latest user ID:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});
App.listen(Port,()=>{
    console.log("Server Started in port");
})