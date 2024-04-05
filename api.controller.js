const express = require('express');
const router = express.Router();
const joi = require('joi');
const api_module = require('./api.model');
const customError = require('./customError');


router.get('/fetchData',async (req,res,next)=>{
    try{
       next() 
    } 
    catch(error){
        next(error);
    }
},api_module.fetchData)



router.post('/addEmployee',async(req,res,next)=>{
    try{
        let schema = joi.object({
            name : joi.string().required(),
            age : joi.number().required(),
            role : joi.string().required(),
            mobile_no : joi.string().required().min(10).max(10),
            email : joi.string().required()
        })

        const { error } = schema.validate(req.body);

        if(error){
            throw new customError(error.details[0].message,400);
        }
        else{
            next();
        }

    }
    catch(error){
        error.statusCode = error.statusCode || 500;
        next(error);
    }
},api_module.addEmployee)

router.patch('/updateEmployee/:_id',async (req,res,next)=>{

    try{
        let schema = joi.object({
            _id : joi.string().required(),
            name : joi.string().optional(),
            age : joi.number().optional(),
            role : joi.string().optional(),
            mobile_no : joi.string().optional(),
            email : joi.string().optional()
        })

        const { error } = schema.validate({...req.params,...req.body});

        if(error){
            throw new customError(error.details[0].message,400);
        }
        else{
            next();
        }
    }
    catch(error){
        error.statusCode = error.statusCode || 500;
        next(error);
    }
},api_module.updateEmployee)


router.delete('/deleteEmployee/:id',async(req,res,next)=>{
    try{
        next();
    }
    catch(error){
        error.statusCode = error.statusCode || 500;
        next(error);
    }
},api_module.deleteEmployee)

module.exports = router;