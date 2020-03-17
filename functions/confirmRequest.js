const winston = require('winston')

const confirmRequest = async (enterPartyModel, partyModel, participantModel, req, res) => {
    try {
        const participantToConfirm = await enterPartyModel.findOne({ where: { PartyOwnerID: req.user._id, PartyID: req.body.PartyID, UserID: req.body.participantID } });
        participantToConfirm.confirmedByPartyOwner = true

        const party = await partyModel.findOne({ where: { id: req.body.PartyID } })
        party.NumberOfParticipants++

        await participantModel.create({
            PartyID: party.id,
            ParticipantID: req.body.participantID
        });

        await party.save()
        await participantToConfirm.save()

        res.status(200).send(participantToConfirm)
    } catch (e) {
        winston.error(e.stack)
        console.log(e)
        return res.status(500).send("Something failed")
    }

}
module.exports = confirmRequest