// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Multer Config ************
const upload = require('../middlewares/multer')

// ************ Multer Config ************
const validation = require('../middlewares/RegisterValidation')
// ************ Controller Require ************
const usersController = require('../controllers/usersController');

/* GET - /users/register */
router.get('/register', usersController.register);
router.post('/register', validation, upload.single('avatar'), usersController.registerProcess)

/* GET - /users/login */
router.get('/login', usersController.login);

/* GET - /users/profile */
router.get('/profile', usersController.profile);

module.exports = router;
