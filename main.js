//import packages
const mongoose=require('mongoose');
const express=require('express');
const app=express();
const port =process.env.port|| 3000
mongoose.connect('mongodb://localhost:27017/Product', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true}); //database connection
//server setup
app.get("/",(req,res)=>{
  res.json("My first rest api");
});
app.listen(port,()=>
console.log(`server is running on port ${port}`)
);

//
