import Jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next) =>{

const {token} = req.headers;

if(!token){
  return res.json({success:false,message:"Not Authorized Login again"})
}
try{
  const tokenDecode = Jwt.verify(token,process.env.JWT_SECRET_KEY);
  req.body.userId = tokenDecode.id;
  next();
}catch(error){
  console.log(error)
  res.json({success:false,message:"Error"})
}
}

export default authMiddleware;