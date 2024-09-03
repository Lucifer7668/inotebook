const express=require('express');
const UserMiddleware = require('../middleware/UserMiddlware');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const router=express.Router();

//Route 1: Get All notes using GET: "api/notes/fetchallnotes" . Login required
router.get('/fetchallnotes',UserMiddleware, async(req, res) => {
    try{
        const notes= await Notes.find({user:req.user.id});
        res.status(200).json(notes);
    }catch(error){
        res.status(400).json({error:error.message});
    }
  })

//Route 2: Save note using POST: "api/notes/savenote" . Login required


  router.post('/savenote',UserMiddleware,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','enter a valid description').isLength({min:3}),
  ], async(req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      const formattedErrors = errors.array().reduce((acc, error) => {
        acc[error.path] = error.msg;
        return acc;
    }, {});
    return res.status(400).json({ errors: formattedErrors });
    }
    const {title,description,tag}=req.body;
    try{
        const note=await Notes.create({
            user:req.user.id,
            title:req.body.title,
            description:req.body.description,
        });
        res.status(200).json(note);
    }catch(error){
        res.status(400).json({error:error.message});
    }
  })

  //Route 3: Edit note using POST: "api/notes/editnote" . Login required


  router.put('/editnote/:id',UserMiddleware,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','enter a valid description').isLength({min:3}),
  ], async(req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      const formattedErrors = errors.array().reduce((acc, error) => {
        acc[error.path] = error.msg;
        return acc;
    }, {});
    return res.status(400).json({ errors: formattedErrors });
    }
    const {title,description,tag}=req.body;
    try{
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        //Find the note and update
        let note=await Notes.findById(req.params.id);
        if(!note){
           return res.status(404).json({error:"No Found"});
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).json({error:"not allowed"});
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        
        res.status(200).json(note);
    }catch(error){
        res.status(400).json({error:error.message});
    }
  })

    //Route 4: Delete note using POST: "api/notes/deletenote" . Login required


    router.delete('/deletenote/:id',UserMiddleware, async(req, res) => {
       
        try{
            //Find the note and delete
            let note=await Notes.findById(req.params.id);
            if(!note){
               return res.status(404).json({error:"No data Found"});
            }
            if(note.user.toString()!==req.user.id){
                return res.status(401).json({error:"not allowed"});
            }
            note =await Notes.findByIdAndDelete(req.params.id);
            
            res.status(200).json({"success":"Note Has been deleted",note:note});
        }catch(error){
            res.status(400).json({error:error.message});
        }
      })
  module.exports=router;
