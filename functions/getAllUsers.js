const winston = require('winston')

const getAllUsers = async (UserModel, req, res) => {
    try {
        const users = await UserModel.findAll({ attributes: { exclude: ['password', 'IsAdmin', 'createdAt', 'updatedAt'] } });
        if (users.length > 0) {

            res.status(200).send(users)
        }
        else {
            res.status(404).send("No users found")
        }
    } catch (e) {
        winston.error(e.stack)
        return res.status(500).send("Something failed")
    }
}
module.exports = getAllUsers