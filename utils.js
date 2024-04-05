const mysqlConnect = require('./mysqldb');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let jwt_token = process.env.jwt_token;


let getConnection = (query,params)=>{
    return new Promise((resolve,reject)=>{
        mysqlConnect.query(query,params,(err,result)=>{
            if(!err) resolve(result);
            else reject(err);
        })
    })
}

let generateToken = (data)=>{
    let access_token = jwt.sign(data,jwt_token,{expiresIn : '10s'})
    let refresh_token = jwt.sign(data,jwt_token,{expiresIn : '1d'});

    return {access_token,refresh_token}
}

let verifyToken = (req,res,next)=>{
    let token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if(token === null) return res.sendStatus(401);

    jwt.verify(token,jwt_token,(err,result)=>{
        if(err) return res.status(403).json({ statusCode : 0, msg : 'Forbidden', err: err.message});

        res.data = result;
        next()
    })
  
}


let refreshToken = async (req,res,next)=>{

    const { refresh_token,data } = req.body;

    jwt.verify(refresh_token,jwt_token,(err,result)=>{
        if(err) return res.status(403).json({ statusCode : 0, msg : 'Forbidden', err : err.message});

        let access_token = jwt.sign(data,jwt_token,{expiresIn : '10s'});

        res.json({access_token})
    })
}

// console.log(generateToken({user_name : 'srini'}));



let isEmpty = (data)=>{
   return(
     (data === null) ||

     (data.hasOwnProperty('length') && data.length === 0) ||

     (data.constructor === Object && Object.keys(data).length === 0)
   )
}


module.exports = {
    getConnection,
    isEmpty,
    verifyToken,
    generateToken,
    refreshToken
}