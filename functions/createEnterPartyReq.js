const winston = require('winston')
const { validateEnterPartyReq } = require('../validateObject')

const createEnterPartyReq = async (partyModel, enterPartyModel, req, res) => {
    const { error } = validateEnterPartyReq(req.body)

    if (!error) {
        try {
            const party = await partyModel.findOne({ where: { id: req.body.PartyID } });
            if (!party)
                return res.status(404).send("Party does not exist")
            if (party.PartyOwnerID === req.user._id)
                return res.status(400).send("Can't request your party")
            const Req = await enterPartyModel.findOne({ where: { PartyID: req.body.PartyID } });
            if (Req)
                return res.status(400).send("Party already has been requested")
            const EnterPartyReq = await enterPartyModel.create({
                PartyID: req.body.PartyID,
                UserID: req.user._id,
                PartyOwnerID: party.PartyOwnerID,
                requestDate: Date.now(),
                confirmedByPartyOwner: false
            });
            if (EnterPartyReq) {
                return res.status(200).send(EnterPartyReq)

            }

        } catch (e) {
            winston.error(e.stack)
            return res.status(500).send("Something failed")

        }
    }
    console.log(error)
    return res.status(400).send("Invalid input")
}
module.exports = createEnterPartyReq