const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    mobile_no : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }
},{ timestamps : true})


module.exports = mongoose.model('User',userSchema);