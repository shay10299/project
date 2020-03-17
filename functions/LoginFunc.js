const { validateLogin } = require('../validateObject')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const envConfigs = require('../database/config/config');
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

const LoginFunc = async (UserModel, req, res) => {
    const { error } = validateLogin(req.body)
    if (error)
        return res.status(400).send("Invalid input")

    const user = await UserModel.findOne({ where: { email: req.body.email } });
    if (!user)
        return res.status(404).send("User does not exist")

    const confirmPassword = await bcrypt.compare(req.body.password, user.password);
    if (!confirmPassword) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({ _id: user.id, isAdmin: user.IsAdmin }, config.jwtPrivateKey);
    res.header('x-auth-token', token);

    res.status(200).send(token)
}
module.exports = LoginFunc