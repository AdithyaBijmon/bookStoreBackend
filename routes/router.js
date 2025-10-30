const express = require('express');
const { registerController, loginController, googleLoginController, updateUserProfile, getAllUsers, updateAdminProfile } = require('../controllers/userController');
const { addBookController, getHomeBooks, getAllBooks, viewBookController, getAllUserBooks, getAllUserBoughtBooks, deleteUserBook, getAllBooksAdmin, approveBooks } = require('../controllers/bookController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const multerConfig = require('../middlewares/ImageUploadMiddleware');
const adminJwtMiddleware = require('../middlewares/adminJwtMiddleware');
const { addJobController, getAllJobsController, removeJobController } = require('../controllers/jobController');
const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)

// google login 
router.post('/google-login', googleLoginController)

router.get('/all-jobs',getAllJobsController)
router.post('/add-book',jwtMiddleware,multerConfig.array('uploadImages',3),addBookController)
router.get('/home-books', getHomeBooks)
router.get('/all-books',jwtMiddleware,getAllBooks)
router.get('/book/:id/view',jwtMiddleware ,viewBookController)
router.get('/user-books',jwtMiddleware,getAllUserBooks)
router.get('/user-bought-books',jwtMiddleware,getAllUserBoughtBooks)
router.delete('/user-book/:id/remove',jwtMiddleware,deleteUserBook)
router.put('/user-profile/edit',jwtMiddleware,multerConfig.single('profile'),updateUserProfile)
router.get('/all-users',adminJwtMiddleware,getAllUsers)

// admin
router.get('/admin-all-books',adminJwtMiddleware,getAllBooksAdmin)
router.put('/admin/book/approve',adminJwtMiddleware,approveBooks)
router.put('/admin-profile/edit',adminJwtMiddleware,multerConfig.single('profile'),updateAdminProfile)
router.post('/admin/add-job',adminJwtMiddleware,addJobController)
router.delete('/admin/:id/remove-job',adminJwtMiddleware,removeJobController)


module.exports = router;