const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const winston = require('winston')
const asyncHandler = require('express-async-handler')
const getUser = require('../functions/getUser')
const createParty = require('../functions/createParty')
const getMyParties = require('../functions/getMyParties')
const getMyConfirmedParties = require('../functions/getMyConfirmedParties')
const getPartyByID = require('../functions/getPartyByID')
const getAllParties = require('../functions/getAllParties')
const db = require('../database/models')


/**
 * Creates a new party for user
 */
router.post('/create', auth, asyncHandler(async (req, res) => {

    createParty(db['Party'], db['Participants'], req, res)

}))

/**
 * Returns user's parties
 */
router.get('/myParties', auth, asyncHandler(async (req, res) => {

    getMyParties(db['Party'], req, res)


}))

/**
 * Returns user's parties  
 */
router.get('/myConfirmedParties', auth, asyncHandler(async (req, res) => {

    getMyConfirmedParties(db['Participants'], req, res)

}))

/**
 * Returns party for a specified id
 */
router.post('/partyByID', auth, asyncHandler(async (req, res) => {

    getPartyByID(db['Party'], req, res)

}))

/**
 * Returns all parties 
 */
router.get('/allParties', auth, asyncHandler(async (req, res) => {

    getAllParties(db['Party'], req, res)


}))
router.post('/PartyParticipants', auth, asyncHandler(async (req, res) => {
    try {
        getUser(db['User'], db['Participants'], req.body.PartyID).then((result) => {
            return res.status(200).send(result)
        }).catch((e) => {
            winston.error(e.stack)
            return res.status(500).send("Something failed")
        })

    } catch (e) {
        winston.error(e.stack)
        console.log(e)
        return res.status(500).send("Something failed")
    }

}))


module.exports = router 
