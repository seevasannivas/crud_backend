const express = require('express');
const router = express.Router();
const auth = require('./auth.model');
const customError = require('./customError');
const joi = require('joi');
const util = require('./utils');

router.post('/login', async (req, res, next) => {
    try {
        let schema = joi.object({
            username: joi.string().required(),
            password: joi.string().optional()
        })

        const { error } = schema.validate(req.body);

        if (error) {
            throw new customError(error.details[0].message, 400);
        }
        else {
            next();
        }
    }
    catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}, auth.login)

router.post('/refreshToken', async (req, res, next) => {
    try {
        let schema = joi.object({
            refresh_token : joi.string().required(),
            data: joi.object().required()
        })

        const { error } = schema.validate(req.body);

        if (error) {
            throw new customError(error.details[0].message, 401);
        }
        else {
            next()
        }
    }
    catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
},util.refreshToken)


module.exports = router;