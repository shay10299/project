
const winston = require('winston')

const getMyParties = async (partyModel, req, res) => {
    try {
        const parties = await partyModel.findAll({ where: { PartyOwnerID: req.user._id } });
        if (parties.length > 0) {
            res.status(200).send(parties)
        }
        else {
            res.status(404).send("No parties found")
        }
    } catch (e) {
        winston.error(e.stack)
        return res.status(500).send("Something failed")
    }
}
module.exports = getMyParties