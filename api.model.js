const User = require('./model/user')
const utils = require('./utils');
const customError = require('./customError');

let fetchData = async (req, res, next) => {
    try {
        let result = await User.find();

        if (!utils.isEmpty(result)) return res.status(200).json({ statusCode: 1, msg: 'fetched successfully', data: result })

        else {

            let err = new customError("Data not Found", 404);
            throw err;
        }
    }
    catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}



let addEmployee = async (req, res, next) => {
    try {
        const { name, age, role, mobile_no, email } = req.body;

        let query = await User.where("mobile_no").equals(mobile_no);


        if (utils.isEmpty(query)) {
            let empDetails = await User.create(req.body);

            if (!utils.isEmpty(empDetails)) {
                return res.status(200).json({ statusCode: 1, msg: 'Inserted Successfully' });
            }
            else {
                throw new customError('Insertion Fail', 409);
            }
        }
        else {
            throw new customError('User Already Exists', 409);
        }

    }
    catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}

let updateEmployee = async (req, res, next) => {
    try {
        const { mobile_no } = req.body;
        let check_user = await User.find().where('mobile_no').equals(mobile_no).where('_id').ne(req.params._id);
        if (utils.isEmpty(check_user)) {
            let result = await User.findByIdAndUpdate(req.params._id, req.body, { new: true })

            if (!utils.isEmpty(result)) {
                return res.status(200).json({ statusCode: 1, msg: "updated successfully" });
            }
            else {
                throw new customError('Updation Fail', 409);
            }
        }
        else {
            throw new customError('User already exists', 409);
        }

    }
    catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}


let deleteEmployee = async (req, res, next) => {
    try {
        let result = await User.findByIdAndDelete(req.params.id)

        if (!utils.isEmpty(result)) return res.status(200).json({ statusCode: 1, msg: "Deleted Successfully" });
        else throw new customError('Deletion Fail', 409);
    }
    catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}

module.exports = {
    fetchData,
    addEmployee,
    updateEmployee,
    deleteEmployee
}