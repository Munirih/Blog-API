const Joi = require('joi');
const ArticleModel = require('../models/article.model');

const postArticle = async (req, res, next) => {
    const articleSchema = Joi.object({
        title: Joi.string().min(5).required(),
        content: Joi.string().min(10).required(),
        author: Joi.string().default("Anonymous"),
    });

    const { error, value } = articleSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { title, content, author } = value;
        const newArticle = new ArticleModel({ title, content, author });
        await newArticle.save();
        res.status(201).json({
            message: "New Article Created!",
            data: newArticle
    });

    } 
    catch (error) {
        res.status(500).json({ error: error });
        next(error);
    }
}

const getAllArticles = async (req, res, next) => {
    
    const { limit = 10, page = 1, search } = req.query;
    const skip = (page - 1 ) * limit;

    let query = {}
    if (search) {
        query = {
            $or: [
                { title: {$regex: search, $options: 'i'} },
                { content: {$regex: search, $options: 'i'} }
            ]
        }
    }

    try {
        const articles = await ArticleModel.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        const totalArticles = await ArticleModel.countDocuments(query)

        res.status(200).json({
            articles,
            totalArticles: Math.ceil(totalArticles / limit),
            currentPage: parseInt(page)
            })
    } 
    catch (error) {
        res.status(500).json({ error: error });
        next(error);
    }
}

const getArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findById(req.params.id)
        if (!article) {
            return res.status(404).json({
                message: `Article with id ${req.params.id} not found`
            })
        }
        return res.status(200).json({
            message: "Article fetched successfully",
            data: article
        })
    } 
    catch (error) {
        console.log(error);
        next(error);
    }
}

const updateArticleById = async (req, res, next) => {
        const articleSchema = Joi.object({
        title: Joi.string().min(5).optional(),
        content: Joi.string().min(10).optional(),
        author: Joi.string().optional(),
    });

    const { error, value } = articleSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            req.params.id, 
            { ...req.body, updatedAt: new Date() }, 
            { new: true, runValidators: true }
        );
        if (!updatedArticle) {
            return res.status(404).json({
                message: `Article with id ${req.params.id} not found`
            })
        }
        return res.status(200).json({
            message: "Article updated successfully",
            data: updatedArticle
        })
    } 
    catch (error) {
        res.status(500).json({ error: error });;
        next(error);
    }
}

const deleteArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findByIdAndDelete(req.params.id)
        if (!article) {
            return res.status(404).json({
                message: `Article with id ${req.params.id} not found`
            })
        }
        return res.status(200).json({
            message: "Article deleted successfully"
        })
    } 
    catch (error) {
        res.status(500).json({ error: error });;
        next(error);
    }
}




module.exports = {
    postArticle,
    getAllArticles,
    getArticleById,
    updateArticleById,
    deleteArticleById,
}