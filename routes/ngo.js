const express = require('express');
const router = express.Router();
const Ngo = require('../models/ngo');


router.post('/ngosignup',(req, res)=>{
    Ngo.findOne({email: req.body.email})
    .exec((error,ngo)=>{
        if(ngo) return res.status(400).json({
            message: 'Account already exists.'
        });
        else{
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const cnfPassword = req.body.cnfPassword;
            if(password===cnfPassword){
                const newNGO = new Ngo({name, email, password});
            
                newNGO.save((error, data)=>{
                  if(error) return res.status(400).json({message: error.message});
                  if(data) return res.status(201).json({newNGO: data});
                });
            }
            else{
                res.status(400).json({message:"Passwords don't match"});
            }
        }
    });
});

module.exports = router;