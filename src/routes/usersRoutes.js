// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

/* GET - /users/register */
router.get('/register', usersController.register);

/* GET - /users/login */
router.get('/login', usersController.login);

/* GET - /users/profile */
router.get('/profile', usersController.profile);

module.exports = router;
