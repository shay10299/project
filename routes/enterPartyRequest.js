const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const winston = require('winston')
const connectToDB = require('../startup/connectDB');
const asyncHandler = require('express-async-handler')
const { validateEnterPartyReq } = require('../validateObject')


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
    const { error } = validateEnterPartyReq(req.body)

    if (!error) {
        try {
            const party = await arrayOfModels[1].findOne({ where: { id: req.body.PartyID } });
            if (!party)
                return res.status(404).send("Party does not exist")
            if (party.PartyOwnerID === req.user._id)
                return res.status(404).send("Can't request your party")
            const EnterPartyReq = await arrayOfModels[2].create({
                PartyID: req.body.PartyID,
                UserID: req.user._id,
                PartyOwnerID: party.PartyOwnerID,
                requestDate: Date.now()
            });
            if (EnterPartyReq) {
                return res.status(200).send(EnterPartyReq)

            }

        } catch (e) {
            winston.error(e)
            return res.status(500).send("Something failed")

        }
    }
    console.log(error)
    return res.status(400).send("invalid input")
}))

/**
 * Returns user's enter party requests 
 */
router.get('/myRequests', auth, asyncHandler(async (req, res) => {
    try {
        const requests = await arrayOfModels[2].findAll({ where: { UserID: req.user._id } });
        if (requests.length > 0) {
            res.status(200).send(requests)
        }
        else {
            res.status(404).send("No requests found")
        }
    } catch (e) {
        winston.error(e)
        return res.status(500).send("Something failed")
    }


}))


/**
 * Returns party owner requests to confirm
 */
router.get('/myRequestsToConfirm', auth, asyncHandler(async (req, res) => {
    try {
        const requests = await arrayOfModels[2].findAll({ where: { PartyOwnerID: req.user._id } });
        if (requests.length > 0) {
            res.status(200).send(requests)
        }
        else {
            res.status(404).send("No requests found")
        }
    } catch (e) {
        winston.error(e)
        return res.status(500).send("Something failed")
    }


}))

/**
 * Confirm party requests from users
 */
router.post('/confirm', auth, asyncHandler(async (req, res) => {
    try {
        const participantToConfirm = await arrayOfModels[2].findOne({ where: { PartyOwnerID: req.user._id, PartyID: req.body.PartyID, UserID: req.body.participantID } });
        participantToConfirm.confirmedByPartyOwner = true

        const party = await arrayOfModels[1].findOne({ where: { id: req.body.PartyID } })
        party.NumberOfParticipants++

        await arrayOfModels[3].create({
            PartyID: party.id,
            ParticipantID: req.body.participantID
        });

        await participantToConfirm.destroy()
        await party.save()
        await participantToConfirm.save()

        res.status(200).send(participantToConfirm)
    } catch (e) {
        winston.error(e)
        console.log(e)
        return res.status(500).send("Something failed")
    }

}))
module.exports = router 
