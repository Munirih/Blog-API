const Joi = require('joi')

// Validation for creating a new post
const postArticleSchema = Joi.object({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(10).required()
});

const validateArticle = (req, res, next) => {
    const { error } = postArticleSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

const updateValidationSchema = Joi.object({
    title: Joi.string().min(5).optional(),
    content: Joi.string().min(10).optional(),
    author: Joi.string().optional()
});

const validateUpdateArticle = (req, res, next) => {
    const { error } = updateValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}
module.exports = {
    validateArticle,
    validateUpdateArticle
}