const Joi = require('joi');

const validateNewsPost = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        content: Joi.string().required(),
        category: Joi.string().required(),
        views: Joi.number().integer().min(0),
        publishDate: Joi.date().greater('now'),
        authorPhone: Joi.string().pattern(/^\+32\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/)
            .message('Phone number not in format +32 444 44 44 44 hebben')
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};

module.exports = { validateNewsPost };