const mongoose = require('mongoose');

require('dotenv').config();

let mongo_string = process.env.mongo_string;

mongoose.connect(mongo_string);

let connect = mongoose.connection;

  
connect.on('error',(err)=> console.log(err.message));

connect.on('connected',()=> console.log(`connected successfully`));