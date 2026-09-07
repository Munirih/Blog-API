require("dotenv").config();


const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connectDB")
const RequestLogger = require("./middlewares/logger")
const errorHandler = require("./middlewares/errorHandler")
const ArticleRoutes = require("./routes/article.route")

const app = express();
const port = process.env.PORT || 3000; 

app.use(RequestLogger);
app.use(errorHandler);

app.use(express.json());
app.use(cors('*'));
app.use('/api', ArticleRoutes);

connectDB();

app.get("/", (req, res) => {
    res.send("Hello World!");
})



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})