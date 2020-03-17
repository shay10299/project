const winston = require('winston')

const getAllParties = async (partyModel, req, res) => {
    try {
        const parties = await partyModel.findAll();
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
module.exports = getAllParties 