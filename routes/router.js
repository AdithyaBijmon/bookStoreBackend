const express = require('express');
const { registerController, loginController, googleLoginController } = require('../controllers/userController');
const { addBookController } = require('../controllers/bookController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
// google login 
router.post('/google-login', googleLoginController)
router.post('/add-book',jwtMiddleware,addBookController)

module.exports = router;