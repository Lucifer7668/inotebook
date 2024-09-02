const express=require('express');
const User=require('../models/User');
const router=express.Router();

//Register user using :post "/api/auth/register". Doesn't required Auth
router.post('/register', (req, res) => {
    console.log(req.body);
    const user=User(req.body);
    user.save();
    res.send(req.body)
  })
  module.exports=router;