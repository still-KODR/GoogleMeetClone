const Joi = require("joi");
const AppError = require("../../utils/errors");

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));
    next();
};

module.exports = {validateLogin};