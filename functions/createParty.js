
const winston = require('winston')
const { validateParty } = require('../validateObject')

const createParty = async (partyModel, participantModel, req, res) => {
    const { error } = validateParty(req.body)

    if (!error) {
        try {
            const parties = await partyModel.findAll({ where: { PartyOwnerID: req.user._id, PartyName: req.body.PartyName } });
            if (parties.length > 0)
                return res.status(400).send("Party already exists")
            const party = await partyModel.create({
                PartyName: req.body.PartyName,
                PartyOwnerID: req.user._id,
                date: req.body.date,
                NumberOfParticipants: 1,
                hour: req.body.hour
            });
            await participantModel.create({
                PartyID: party.id,
                ParticipantID: req.user._id
            });
            if (party) {
                return res.status(200).send(party)

            }
        } catch (e) {
            winston.error(e.stack)
            return res.status(500).send("Something failed")

        }
    }
    else {
        console.log(error)
        return res.status(400).send("Invalid input")
    }

}
module.exports = createParty