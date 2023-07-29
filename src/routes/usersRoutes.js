// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Multer Config ************
const upload = require('../middlewares/multer')

// ************ Multer Config ************
const validationCad = require('../middlewares/RegisterValidation');
const validationLog = require('../middlewares/loginValidation');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

/* GET - /users/register */
router.get('/register', usersController.register);
router.post('/register',  upload.single('avatar'), validationCad, usersController.registerProcess)

/* GET - /users/login */
router.get('/login', usersController.login);
router.post('/login', validationLog, usersController.loginProcess)

/* GET - /users/profile */
router.get('/profile', usersController.profile);

module.exports = router;
