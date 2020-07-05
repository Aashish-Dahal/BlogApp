const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{

  let token=req.headers["authorization"].split(" ")[1];
  if(token)
  {
    jwt.verify(token,'secret',(err,decoded)=>{
      if(err)
      {
        return res.json({
          status:false,
          msg:"Invalid token"
        })
      }
      else{
        req.decoded=decoded;
        next();
      }
    })
  }
  else{
    return res.json({
      status:false,
      msg:"Empty token field"
    })
  }
 
  
 
};