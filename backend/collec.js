const DB=require('mongoose');
const S=require('express');
const P=require('body-parser');
const Cors=require('cors');
const{USER}=require('./userSchema');
const App=S();
App.use(P.json());
App.use(Cors());
const Books=DB.model('User', USER);
async function connecttoDB2(){
    try{
        await DB.connect('mongodb+srv://kmugeis2005:dontforgetit@mugeishhero.ggr3iod.mongodb.net/BookLib?retryWrites=true&w=majority&appName=mugeishhero');
        console.log("DB Connection Success");
    }catch(error){
        console.log("Error:"+error)
    }
}
connecttoDB2();