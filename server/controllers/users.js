const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes')
const User = require('../model/user')
require('dotenv').config()

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.status(404).json({ message: 'User does not exist' })
        }

        const isMatchingPassword = await bcrypt.compare(password, oldUser.password);
        if (!isMatchingPassword) {
            return res.status(400).json({ message: 'Password is incorrect' })
        }

        const token = jwt.sign(
            { id: oldUser._id, email: oldUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '15d' });
        res.status(StatusCodes.OK).json({ result: oldUser, token })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' })
    }
}

const signup = async (req, res) => {
    const { firstName, lastName, email, password, imageUrl } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: 'User already exist' })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
            imageUrl
        })

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '30d' });

        res.status(StatusCodes.OK).json({ result: { id: newUser._id, name: newUser.name, imageUrl: newUser.imageUrl }, token })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' })
    }
}

module.exports = {
    signin, signup
}