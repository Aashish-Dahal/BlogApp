const express=require('express');
const  User=require('../models/users.model');
const router=express.Router();
const middleware=require('../middleware')
const jwt=require('jsonwebtoken');

router.get('/:username',middleware,(req,res)=>{
    User.findOne({username:req.params.username},(err,data)=>{
        if(err) return res.status(500).json({msg:err})
        const msg={
            data:data,
            username:req.params.username
        };
        return res.json(msg);
    });

});
router.post('/login',(req,res)=>{
    User.findOne({username:req.body.username},(err,data)=>{
        if(err) return res.status(500).json({msg:err})
     if(data==null)
     {
        return res.status(403).json("Username is incorrect");

     }
     if(data.password==req.body.password)
     {
        let token= jwt.sign({username:req.body.username},'secret',{
             expiresIn:'24h'
         })
        res.json({
            token:token,
            msg:'success'
        });

     }
     else{
        res.status(403).json("password is incorrect");
     }
        
    });

});
router.post("/register",(req,res)=>{
 const user=new User({
     username:req.body.username,
     password:req.body.password,
     email:req.body.email,

 });
 user.save()
 .then((docs)=>{
     console.log('user registered');
     res.status(200).json({
         msg:'ok',
         record:docs
     });
 })
 .catch((err)=>{
     //The HTTP 403 Forbidden client error status response code indicates that the server understood the request but refuses to authorize it.
     res.status(403).json({
         msg:err,
     })
    
 });
 router.patch('/update/:username',(req,res)=>{
     User.findOneAndUpdate(
         {username:req.params.username},
         {$set:{password:req.body.password}},
     (err,result)=>{
         if(err)return res.status(500).json({msg:err});
         const msg={
             msg:'Password successfully updated',
             username:req.params.username,
         };
         return res.json(msg);
     }
     );
 });
 router.delete('/delete/:username',(req,res)=>{
     User.findOneAndDelete({username:req.params.username},(err,data)=>{
         if(err) return res.status(500).json({msg:err})
         const msg={
             msg:"user deleted",
             username:req.params.username
         };
         return res.json(msg);
     });

 });
})
module.exports=router;