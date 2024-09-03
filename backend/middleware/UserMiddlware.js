var jwt = require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET;

const UserMiddleware=(req,res,next)=>{
    //get the user from the jwt token and add id to request object
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }

    // Extract the token from the 'Authorization' header
    const token = authHeader.split(' ')[1];

    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    }catch(error){
        res.status(401).json({error:"Please authenticate using a valid token"});

    }
    
}

module.exports=UserMiddleware;