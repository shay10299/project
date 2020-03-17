
const winston = require('winston')

const getMyConfirmedParties = async (participantModel, req, res) => {
    try {
        const parties = await participantModel.findAll({ where: { ParticipantID: req.user._id } });
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
module.exports = getMyConfirmedParties