const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const pg = require('pg');
const deleteUserFunc = require('../functions/deleteUserFunc')
const getAllUsers = require('../functions/getAllUsers')
const LoginFunc = require('../functions/LoginFunc')
const registerFunc = require('../functions/registerFunc')
const db = require('../database/models')
delete pg.native;
/**
 * Checks if user is logged in
 */
router.post('/validate', auth, asyncHandler(async (req, res) => {
    res.status(200).send("User is validated");
}));

/**
 * Checks if user is an admin
 */
router.post('/validateAdmin', [auth, admin], asyncHandler(async (req, res) => {
    res.status(200).send("Admin is validated");
}));

/**
 * Deleting user
 */
router.post('/DeleteUser', [auth, admin], asyncHandler(async (req, res) => {
    deleteUserFunc(db['User'], db['Party'], db['enterpartyrequest'], db['Participants'], req, res)

}));


/**
 * Returns all users
 */
router.get('/AllUsers', [auth, admin], asyncHandler(async (req, res) => {

    getAllUsers(db['User'], req, res)


}));

/**
 * Login user and creates a jwt token for user
 */
router.post('/login', asyncHandler(async (req, res) => {

    LoginFunc(db['User'], req, res)

}));


/**
 * Register user and creates a token 
 */
router.post('/register', asyncHandler(async (req, res) => {

    registerFunc(db['User'], req, res)

}))

module.exports = router; 
