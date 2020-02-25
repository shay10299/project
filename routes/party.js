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

router.post('/create', auth, asyncHandler(async (req, res) => {
    const { error } = validateParty(req.body)
    if (!error) {
        try {
            const party = await arrayOfModels[1].create({
                PartyName: req.body.PartyName,
                PartyOwnerID: req.user._id,
                date: req.body.date,
                MaxParticipants: req.body.MaxParticipants,
                NumberOfParticipants: req.body.NumberOfParticipants,
                hour: req.body.hour
            });
            if (party) {
                return res.status(200).send(party)

            }
        } catch (e) {
            winston.error(e)
            return res.status(500).send("Something failed")

        }
    }
    console.log(error)
    return res.status(400).send("invalid input")
}))

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
