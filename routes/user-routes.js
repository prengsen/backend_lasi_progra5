const express = require('express');
const {check} = require('express-validator');

const router = express.Router();

const userController = require('../models/users-controller');

router.get('/', userController.getUsers);

router.post('/signup', 
     [
         check('name').not().isEmpty(),
         check('password').isLength({min: 5}),
         check('email').normalizeEmail().isEmail()
     ]   
    ,userController.singup);

router.post('/login', userController.login);

module.exports = router;