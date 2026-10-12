const express = require('express')
const { getAllArticles, postArticle, getArticleById, updateArticleById, deleteArticleById } = require('../controllers/article.controller')
const requireAuth = require('../middlewares/requireAuth')
const { validateArticle, validateUpdateArticle } = require('../validations/article.validation');

const router = express.Router();

router.use(requireAuth) // Apply requireAuth middleware to all routes in this router

router.get('/articles', getAllArticles);

router.post('/articles/add_article', validateArticle, postArticle);

router.get('/articles/:id', getArticleById);

router.put('/articles/:id', validateUpdateArticle, updateArticleById);

router.delete('/articles/:id', deleteArticleById);


module.exports = router;