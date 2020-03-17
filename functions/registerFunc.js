const { validateUser } = require('../validateObject')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const envConfigs = require('../database/config/config');
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];
const winston = require('winston')

const registerFunc = async (UserModel, req, res) => {
    const { error } = validateUser(req.body)

    if (!error) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt)

        try {
            const user = await UserModel.create({
                name: req.body.username,
                email: req.body.email,
                age: req.body.age,
                password: password
            })

            if (user) {
                try {
                    const token = jwt.sign({ _id: user.id, isAdmin: user.IsAdmin }, config.jwtPrivateKey);
                    res.header('x-auth-token', token);
                    return res.status(200).send(token)

                } catch (e) {
                    winston.error(e.stack)
                    return res.status(500).send("Error creating token")
                }
            }

        } catch (e) {
            if (e.errors[0].message === "email must be unique") {
                winston.error(e.stack)
                return res.status(400).send("User already registered")
            }
            return res.status(500).send("Something failed")

        }
    }
    else {
        return res.status(400).send("Invalid input")

    }

}
module.exports = registerFunc