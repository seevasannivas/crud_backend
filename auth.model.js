const utils = require('./utils');
const User = require('./model/user')
const customError = require('./customError')

let login = async (req,res,next)=>{
    try{
        const { username } = req.body;

        let result = await User.find().where('mobile_no').equals(username);

        if(!utils.isEmpty(result)){

            let data = {...result,token : utils.generateToken({...username})};
            // result[0].token = "srini";
            
            res.status(200).json({statusCode : 1, msg : 'Logged Successfully',data:data});
        }
        else{
            throw new customError('User not found',404);
        }
    }
    catch(error){
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}

module.exports = {
    login
}