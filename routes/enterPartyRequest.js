const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const winston = require('winston')
const asyncHandler = require('express-async-handler')
const createEnterPartyReq = require('../functions/createEnterPartyReq')
const getMyRequests = require('../functions/getMyRequests')
const getMyRequestsToConfirm = require('../functions/getMyRequestsToConfirm')
const confirmRequest = require('../functions/confirmRequest')
const db = require('../database/models')
enterPartyReqModel = db['enterpartyrequest']



/**
 * Creates a new party request for user
 */
router.post('/create', auth, asyncHandler(async (req, res) => {

    createEnterPartyReq(db['Party'], db['enterpartyrequest'], req, res)

}))

/**
 * Returns user's enter party requests 
 */
router.get('/myRequests', auth, asyncHandler(async (req, res) => {

    getMyRequests(db['enterpartyrequest'], req, res)


}))


/**
 * Returns party owner requests to confirm
 */
router.get('/myRequestsToConfirm', auth, asyncHandler(async (req, res) => {

    getMyRequestsToConfirm(db['enterpartyrequest'], req, res)

}))

/**
 * Confirm party requests from users
 */
router.post('/confirm', auth, asyncHandler(async (req, res) => {

    confirmRequest(db['enterpartyrequest'], db['Party'], db['Participants'], req, res)

}))
module.exports = router 
