const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const winston = require('winston')
const connectToDB = require('../startup/connectDB');
const asyncHandler = require('express-async-handler')
const createEnterPartyReq = require('../functions/createEnterPartyReq')
const getMyRequests = require('../functions/getMyRequests')
const getMyRequestsToConfirm = require('../functions/getMyRequestsToConfirm')
const confirmRequest = require('../functions/confirmRequest')


let arrayOfModels
try {
    const connect = async () => {
        arrayOfModels = await connectToDB()
    }
    connect()
} catch (error) {

}

/**
 * Creates a new party request for user
 */
router.post('/create', auth, asyncHandler(async (req, res) => {

    createEnterPartyReq(arrayOfModels[1], arrayOfModels[2], req, res)

}))

/**
 * Returns user's enter party requests 
 */
router.get('/myRequests', auth, asyncHandler(async (req, res) => {

    getMyRequests(arrayOfModels[2], req, res)


}))


/**
 * Returns party owner requests to confirm
 */
router.get('/myRequestsToConfirm', auth, asyncHandler(async (req, res) => {

    getMyRequestsToConfirm(arrayOfModels[2], req, res)

}))

/**
 * Confirm party requests from users
 */
router.post('/confirm', auth, asyncHandler(async (req, res) => {

    confirmRequest(arrayOfModels[2], arrayOfModels[1], arrayOfModels[3], req, res)

}))
module.exports = router 
