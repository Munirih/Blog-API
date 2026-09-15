require("dotenv").config();


const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connectDB")
const RequestLogger = require("./middlewares/logger")
const errorHandler = require("./middlewares/errorHandler")
const ArticleRoutes = require("./routes/article.route")
const UserRoutes = require("./routes/user.route")


const app = express();
const port = process.env.PORT || 3000; 

connectDB();

app.use(express.json());
app.use(cors('*'));

app.use(RequestLogger);

app.use('/api', ArticleRoutes);
app.use('/api/users/', UserRoutes);



app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})