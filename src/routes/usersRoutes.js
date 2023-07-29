// ************ Require's ************
const express = require('express');
const router = express.Router();
const logged = require('../middlewares/logged');
const notLogged = require('../middlewares/not-logged')
// ************ Multer Config ************
const upload = require('../middlewares/multer')

// ************ Multer Config ************
const validationCad = require('../middlewares/RegisterValidation');
const validationLog = require('../middlewares/loginValidation');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

/* GET - /users/register */
router.get('/register', logged, usersController.register);
router.post('/register',  upload.single('avatar'), validationCad, usersController.registerProcess)

/* GET - /users/login */
router.get('/login', logged, usersController.login);
router.post('/login', validationLog, usersController.loginProcess)

/* GET - /users/profile */
router.get('/profile', notLogged, usersController.profile);

router.get('/logout', usersController.logout )
module.exports = router;
