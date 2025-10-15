const express = require('express');
const { registerController, loginController, googleLoginController } = require('../controllers/userController');
const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
// google login 
router.post('/google-login', googleLoginController)

module.exports = router;