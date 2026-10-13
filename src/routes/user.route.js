const express = require('express')

const { registerUser, loginUser } = require('../controllers/user.controller');
const { validateRegister, validateLogin } = require('../validations/user.validation')
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/sign-up', validateRegister, registerUser)

router.post('/login', validateLogin, loginUser)

router.post("/upload", upload.array('image', 5), (req, res) => {
    const fileUrls = req.files.map(file => file.path);
    const filenames = req.files.map(file => file.filename);

    console.log(fileUrls);
    console.log(filenames);
    res.send("Files uploaded successfully");
});

module.exports = router;