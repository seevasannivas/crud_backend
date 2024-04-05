const mysql = require('mysql');
const util = require('util');
const config = {
    host : 'localhost',
    user : 'root',
    password : 'rootroot',
    database : 'cashbox'
}

const mysqlConnect = mysql.createPool(config);

mysqlConnect.query = util.promisify(mysqlConnect.query);
mysqlConnect.getConnection = util.promisify(mysqlConnect.getConnection);


mysqlConnect.getConnection(). 
then(connection =>{
    // console.log(`connected successfully`);

    mysqlConnect.on('connection',(connection)=>{
        connection.on('enqueue',(sequence)=>{
            if('Query' === sequence.constructor.name) console.log(sequence.sql);
        })
    })
}).
catch(err=>{
    console.log(`connection error ${err.message}`);
})
 
module.exports = mysqlConnect;