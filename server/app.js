///////////////////////////////        modules and packages     /////////////////////////////////////
const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');


///////////////////////////////        app uses     /////////////////////////////////////
const app=express();
app.use(bodyParser.json());
require('dotenv').config({path: "./config.env"});


///////////////////////////////        database connection     /////////////////////////////////////
require('./db/connection.js');
// model import
const User=require('./model/user');



app.get("/",(req,res)=>{
    res.send("hello world!")
})

app.post('/register', async (req,res)=>{

    const {nameOfUser:name,emailOfUser:email,phoneOfUser:phone,appointmentDate}=req.body;
    console.log(name,email,phone,appointmentDate);
    try{
        const response=await User.create({name,email,phone,appointmentDate});
        console.log(response); 
        if(response){
            res.status(201).json({RegisterMsg: "successfully booked a new appointment"});
        }
        else{
            res.status(501).json({RegisterMsg: "Failed to book an appointment"});
        }
    }
    catch(error){
        throw error;
    }
    // res.status(201).json({status: 'ok'});

});

app.listen(5000,()=>{
    console.log("server running on port 5000")
})