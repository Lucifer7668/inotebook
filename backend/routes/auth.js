const express=require('express');
const User=require('../models/User');
const router=express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET;
//Register user using :post "/api/auth/register". Doesn't required Auth
router.post('/register',[
    body('email','Enter a valid email') .isEmail().custom(async value => {
        const existingUser = await User.findOne({ 'email': value });
        if (existingUser) {
          // Will use the below as the error message
          throw new Error('A user already exists with this e-mail address');
        }
        return true;
      }),
    body('name','enter a valid email').isLength({min:3}),
    body('password','Password must be atleast 5 character').isLength({min:5}),
    body('phone','Phone Mumber must be 10 digits').isInt().isLength({min:10,max:10}).custom(async value => {
        const existingUser = await User.findOne({'phone':value});
        if (existingUser) {
          // Will use the below as the error message
          throw new Error('A user already exists with this phone number');
        }
        return true;
      }),

] ,async(req, res) => {
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
          const formattedErrors = errors.array().reduce((acc, error) => {
            acc[error.path] = error.msg;
            return acc;
        }, {});
        return res.status(400).json({ errors: formattedErrors });
        }
        const salt=await bcrypt.genSalt(10);
        const secPass =await bcrypt.hash(req.body.password,salt);
        const user=await User.create({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:secPass
        }
            );
            const data={
                user:{
                    id:user.id
                }
            }
        const authtoken=    jwt.sign(data,JWT_SECRET);
        console.log(authtoken);
        res.status(201).json({authtoken});
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
  })


  //Register user using :post "/api/auth/register". Doesn't required Auth
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 character').exists().isLength({min:5}),

] ,async(req, res) => {
   
        const errors=validationResult(req);
        if(!errors.isEmpty()){
          const formattedErrors = errors.array().reduce((acc, error) => {
            acc[error.path] = error.msg;
            return acc;
        }, {});
        return res.status(400).json({ errors: formattedErrors });
        }
        const {email,password}= req.body;
        try {
            let user= await User.findOne({"email":email});
        console.log({email,password,user})

            if(!user){
                return res.status(400).json({errors:{message:"No User Found"}});
            }
            console.log({email,password,user})

            const passwordCompare=await bcrypt.compare(password,user.password);
            if(!passwordCompare){
                return res.status(400).json({errors:{message:"No User Found"}});
            }
            const payload={
                user:{
                    id:user.id
                }
            }
            const authtoken=jwt.sign(payload,JWT_SECRET);
            console.log(authtoken);
            res.status(201).json({authtoken});
      } catch (error) {

        res.status(400).json(error.message);
      }
  })
  
  module.exports=router;