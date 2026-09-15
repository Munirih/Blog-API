const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const UserModel = require('../models/user.model')


const registerUser = async (req, res, next) => {
    const registerSchema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required().unique(),
        password: Joi.string().required()
    });
    const {error} = registerSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    try {
        const { name, email, password } = req.body

        const existingUser = await UserModel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exist!"})
        }
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(password, salt);

        const user = new UserModel({
        name: name,
        email: email,
        password: hashed
    })

        await user.save()
        return res.status(200).json({
            message: "User successfully registered!"
        })
    }
    catch (error) {
        console.log(error)
        next(error)
    }
};


const loginUser = async (req, res, next) => {
    const loginSchema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required().unique(),
        password: Joi.string().required()
    });
    const {error} = loginSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email: email})
        if (!user) {
            return res.status(404).json({ message: "User does not exist!"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) throw new Error('Invalid credentials')
        
        
        const token = jwt.sign(
            { userId: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        );
        return res.status(200).json({ message: "Logged in!", user, token });
    }
    catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = { registerUser, loginUser };