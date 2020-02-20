const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const winston = require('winston')
const connectToDB = require('../startup/connectDB');
const asyncHandler = require('express-async-handler')
const { validateUser, validateLogin } = require('../validateObject')
const envConfigs = require('../database/config/config');
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

let arrayOfModels
try {
    const connect = async () => {
        arrayOfModels = await connectToDB()
    }
    connect()
} catch (error) {

}

router.get('/me', auth, asyncHandler(async (req, res) => {
    res.send("user");
}));
router.post('/login', asyncHandler(async (req, res) => {
    const { error } = validateLogin(req.body)
    if (error)
        return res.status(400).send("Invalid input")
    const user = await arrayOfModels[0].findOne({ where: { email: req.body.email } });
    if (!user)
        return res.send("User does not exist")
    const confirmPassword = await bcrypt.compare(req.body.password, user.password);
    if (!confirmPassword) return res.status(400).send('Invalid email or password.');
    const token = jwt.sign({ _id: user.id }, config.jwtPrivateKey);
    res.header('x-auth-token', token);
    res.status(200).send(token)
}));
router.post('/register', asyncHandler(async (req, res) => {
    const { error } = validateUser(req.body)
    if (!error) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt)
        try {
            const user = await arrayOfModels[0].create({
                name: req.body.username,
                email: req.body.email,
                age: req.body.age,
                password: password
            })
            if (user) {
                try {
                    const token = jwt.sign({ _id: user.id }, config.jwtPrivateKey);
                    res.header('x-auth-token', token);
                } catch (e) {
                    winston.error(e)
                    return res.status(400).send("Error creating token")
                }

                return res.status(200).send(token)
            }
        } catch (e) {
            if (e.errors[0].message === "email must be unique") {
                winston.error(e)
                return res.status(400).send("User already registered")
            }
            return res.status(400).send("Something failed")

        }
    }

}))
module.exports = router; 
