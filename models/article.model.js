const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,

    },
    content: {
        type: String,
        required: true,
        minLength: 10,
    },
    author: {
        type: String,
        default: "Anonymous",

    },
    
}, { timestamps: true })

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;