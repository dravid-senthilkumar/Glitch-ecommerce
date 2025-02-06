const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt');


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const exUser = await userModel.findOne({ email: email });
        if (!exUser) {
            if (validator.isEmail(email) && validator.isStrongPassword(password)) {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)

                    const User = new userModel({
                        username: username,
                        email: email,
                        password: hashPassword
                    });
                    await User.save();
                    const token = jwt.sign({id: User._id}, process.env.SECRET_CODE)
                    return res.status(200).json({ success: true, token })
                } else {
                    return res.status(400).json(" Either email & password are weak")
                }
            } else{
                return res.status(201).json("User Already Exists")
            }
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exUser = await userModel.findOne({ email: email })
        if (exUser) {

            const isMatch = await bcrypt.compare(password, exUser.password)

            if (isMatch) {
                const token = jwt.sign({id: exUser._id}, process.env.SECRET_CODE)
                res.status(200).json({ success: true, token })
            }
            else {
                return res.json({ message: "Password is incorrect" })
            }
        }
        else {
            return res.status(400).send({ success: false, message: "Invaid Credentials" })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const admin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email === process.env.ADMIN_MAIL) {
            if (password === process.env.ADMIN_PASSWORD) {
                const token = jwt.sign(process.env.ADMIN_MAIL, process.env.SECRET_CODE)
                return await res.status(200).send({ success: true, token })
            }
            else {
                return res.status(400).send("Password is Incorrect")
            }
        } else {
            return res.status(400).send({ success: false, message: "Invalid Credentials" })
        }
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = { registerUser, login, admin }