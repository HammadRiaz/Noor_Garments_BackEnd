const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const UserControllers = require('../Controllers/users-controllers');


//Sign IN, Log IN, Get Crate of Particular User, Adding to crate. Delete from Crate , Update in Crate

// Get User
// router.get('/', UserControllers.getUsers);


// Sign UP
router.post('/signup', 
[
    check('Name').not().isEmpty(), 
    check('CellPhone').isLength({min:11}),
    check('Email').normalizeEmail().isEmail(),
    check('Password').isLength({min:5})
    ], UserControllers.signup);

// Log-IN    
router.post('/login', UserControllers.login);

//Get Crate of Particular User


//Adding to crate


//Delete from Crate


//Update in Crate


module.exports = router; 