const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const winston = require('winston')
const connectToDB = require('../startup/connectDB');
const asyncHandler = require('express-async-handler')
const getUser = require('../functions/getUser')
const createParty = require('../functions/createParty')
const getMyParties = require('../functions/getMyParties')
const getMyConfirmedParties = require('../functions/getMyConfirmedParties')
const getPartyByID = require('../functions/getPartyByID')
const getAllParties = require('../functions/getAllParties')


let arrayOfModels
try {
    const connect = async () => {
        arrayOfModels = await connectToDB()
    }
    connect()
} catch (error) {

}

/**
 * Creates a new party for user
 */
router.post('/create', auth, asyncHandler(async (req, res) => {

    createParty(arrayOfModels[1], arrayOfModels[3], req, res)

}))

/**
 * Returns user's parties
 */
router.get('/myParties', auth, asyncHandler(async (req, res) => {

    getMyParties(arrayOfModels[1], req, res)


}))

/**
 * Returns user's parties  
 */
router.get('/myConfirmedParties', auth, asyncHandler(async (req, res) => {

    getMyConfirmedParties(arrayOfModels[3], req, res)

}))

/**
 * Returns party for a specified id
 */
router.post('/partyByID', auth, asyncHandler(async (req, res) => {

    getPartyByID(arrayOfModels[1], req, res)

}))

/**
 * Returns all parties 
 */
router.get('/allParties', auth, asyncHandler(async (req, res) => {

    getAllParties(arrayOfModels[1], req, res)
  

}))
router.post('/PartyParticipants', auth, asyncHandler(async (req, res) => {
    try {
        getUser(arrayOfModels[0], arrayOfModels[3], req.body.PartyID).then((result) => {
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
