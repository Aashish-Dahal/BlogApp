//import packages
const mongoose=require('mongoose');
const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const port =process.env.port|| 3000
mongoose.connect('mongodb://localhost:27017/MyBlog', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true}); //database connection

//middleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
const userRoute=require('./api/routes/user')
app.use("/user",userRoute)

//server setup
app.get("/",(req,res)=>{
  res.json("My first rest api");
});
app.listen(port,()=>
console.log(`server is running on port ${port}`)
);

//
