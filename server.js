const express = require('express');
const cors = require('cors');
const app = express();
const mysql_c = require('./mysqldb');
const customError = require('./customError');
const globalError = require('./error.controller');
require('./mongoose.db')
app.use(express.json());
app.use(express.static(__dirname+'/public/'));
app.use(express.urlencoded({extended : true}));

app.use(cors());

const port = 8030;

     

require('./router')(app);


app.all('*',(req,res,next)=>{
    const err = new customError(`${req.originalUrl} url is not found`,404);

    next(err);
})


app.use(globalError);

app.listen(port,()=>{
    console.log(`running at ${port}`);
})
