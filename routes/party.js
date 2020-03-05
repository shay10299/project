const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const winston = require('winston')
const connectToDB = require('../startup/connectDB');
const asyncHandler = require('express-async-handler')
const { validateParty } = require('../validateObject')


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
    const { error } = validateParty(req.body)
    if (!error) {
        try {
            const party = await arrayOfModels[1].create({
                PartyName: req.body.PartyName,
                PartyOwnerID: req.user._id,
                date: req.body.date,
                NumberOfParticipants: 1,
                hour: req.body.hour
            });
            await arrayOfModels[3].create({
                PartyID: party.id,
                ParticipantID: req.user._id
            });
            if (party) {
                return res.status(200).send(party)

            }
        } catch (e) {
            winston.error(e)
            return res.status(500).send("Something failed")

        }
    }
    else {
        console.log(error)
        return res.status(400).send("Invalid input")
    }

}))

/**
 * Returns user's parties
 */
router.get('/myParties', auth, asyncHandler(async (req, res) => {
    try {
        const parties = await arrayOfModels[1].findAll({ where: { PartyOwnerID: req.user._id } });
        if (parties.length > 0) {
            res.status(200).send(parties)
        }
        else {
            res.status(404).send("No parties found")
        }
    } catch (e) {
        winston.error(e)
        return res.status(500).send("Something failed")
    }


}))

/**
 * Returns user's parties  
 */
router.get('/myConfirmedParties', auth, asyncHandler(async (req, res) => {
    try {
        const parties = await arrayOfModels[3].findAll({ where: { ParticipantID: req.user._id } });
        if (parties.length > 0) {
            res.status(200).send(parties)
        }
        else {
            res.status(404).send("No parties found")
        }
    } catch (e) {
        winston.error(e)
        return res.status(500).send("Something failed")
    }


}))

/**
 * Returns party for a specified id
 */
router.post('/partyByID', auth, asyncHandler(async (req, res) => {
    try {
        const party = await arrayOfModels[1].findAll({ where: { id: req.body.PartyID } });
        if (party.length) {
            res.status(200).send(party)
        }
        else {
            res.status(404).send("No party found")
        }
    } catch (e) {
        winston.error(e)
        return res.status(500).send("Something failed")
    }


}))

/**
 * Returns all parties 
 */
router.get('/allParties', auth, asyncHandler(async (req, res) => {
    try {
        const parties = await arrayOfModels[1].findAll();
        if (parties.length > 0) {
            res.status(200).send(parties)
        }
        else {
            res.status(404).send("No parties found")
        }
    } catch (e) {
        winston.error(e)
        return res.status(500).send("Something failed")
    }

}))

module.exports = router 
