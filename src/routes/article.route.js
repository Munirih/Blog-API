const express = require('express')
const { getAllArticles, postArticle, getArticleById, updateArticleById, deleteArticleById } = require('../controllers/article.controller')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router();

router.use(requireAuth) // Apply requireAuth middleware to all routes in this router

router.get('/articles', getAllArticles);

router.post('/articles/add_article', postArticle);

router.get('/articles/:id', getArticleById);

router.put('/articles/:id', updateArticleById);

router.delete('/articles/:id', deleteArticleById);


module.exports = router;