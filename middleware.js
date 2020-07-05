const jwt=require('jsonwebtoken');
const checkToken=(req,res,next)=>{
  let token=req.headers["authorization"];
  console.log(token);
  next();
}
module.exports={
  checkToken:checkToken,
}