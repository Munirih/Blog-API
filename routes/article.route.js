const express = require('express')
const { getAllArticles, postArticle, getArticleById, updateArticleById, deleteArticleById } = require('../controllers/article.controller')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router();

router.get('/articles', requireAuth, getAllArticles);

router.post('/articles/add_article', requireAuth, postArticle);

router.get('/articles/:id', requireAuth, getArticleById);

router.put('/articles/:id', requireAuth, updateArticleById);

router.delete('/articles/:id', requireAuth, deleteArticleById);


module.exports = router;