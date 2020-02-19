const Joi = require('@hapi/joi');

const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .required(),

        age: Joi.number()
            .min(3)
            .max(120)
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),

    })

    return schema.validate(user);

}
const validateLogin = (userLogin) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),

    })

    return schema.validate(userLogin);

}

module.exports = { validateUser, validateLogin }