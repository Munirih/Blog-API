const Joi = require('joi');

const registerValidationSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
    });

const loginValidationSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });


const validateRegister = (req, res, next) => {
    const {error} = registerValidationSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next();
}


const validateLogin = (req, res, next) => {
    const {error} = loginValidationSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next();
}

module.exports = {
    validateRegister,
    validateLogin
}