
const express = require("express");
const cors = require("cors");
const RequestLogger = require("./middlewares/logger")
const errorHandler = require("./middlewares/errorHandler")
const ArticleRoutes = require("./routes/article.route")
const UserRoutes = require("./routes/user.route")


const app = express();


app.use(express.json());
app.use(cors('*'));

app.use(RequestLogger);


app.use('/api', ArticleRoutes);
app.use('/api/users/', UserRoutes);



app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use(errorHandler);

module.exports = app;