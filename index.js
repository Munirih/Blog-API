require("dotenv").config();
const connectDB = require("./src/config/connectDB")
const app = require('./src/app')
const port = process.env.PORT || 3000;



app.listen(port, async() => {
    await connectDB();
    console.log(`Server is listening on port ${port}`);
})