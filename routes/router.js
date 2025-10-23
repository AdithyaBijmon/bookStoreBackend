const express = require('express');
const { registerController, loginController, googleLoginController } = require('../controllers/userController');
const { addBookController, getHomeBooks, getAllBooks, viewBookController, getAllUserBooks, getAllUserBoughtBooks, deleteUserBook } = require('../controllers/bookController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const multerConfig = require('../middlewares/ImageUploadMiddleware');
const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
// google login 
router.post('/google-login', googleLoginController)
router.post('/add-book',jwtMiddleware,multerConfig.array('uploadImages',3),addBookController)
router.get('/home-books', getHomeBooks)
router.get('/all-books',jwtMiddleware,getAllBooks)
router.get('/book/:id/view',jwtMiddleware ,viewBookController)
router.get('/user-books',jwtMiddleware,getAllUserBooks)
router.get('/user-bought-books',jwtMiddleware,getAllUserBoughtBooks)
router.get('/user-book/:id/remove',jwtMiddleware,deleteUserBook)


module.exports = router;