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

router.post('/create', auth, asyncHandler(async (req, res) => {
    const { error } = validateEnterPartyReq(req.body)

    if (!error) {
        try {
            const EnterPartyReq = await arrayOfModels[2].create({
                PartyID: req.body.PartyID,
                UserID: req.user._id,
                PartyOwnerID: req.body.PartyOwnerID,
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
router.post('/confirm', auth, asyncHandler(async (req, res) => {
    //will edit when starting client side
}))
module.exports = router 
