const winston = require('winston')

const getPartyByID = async (partyModel, req, res) => {
    try {
        const party = await partyModel.findAll({ where: { id: req.body.PartyID } });
        if (party.length) {
            res.status(200).send(party)
        }
        else {
            res.status(404).send("No party found")
        }
    } catch (e) {
        winston.error(e.stack)
        return res.status(500).send("Something failed")
    }

}
module.exports = getPartyByID
