
const winston = require('winston')

const deleteUserFunc = async (userModel, partyModel, enterPartyReqModel, participantModel, req, res) => {
    try {
        const user = await userModel.findOne({ where: { id: req.body.id } });
        if (!user)
            return res.status(404).send("User does not exist")
        else if (user.id === req.user._id) {
            return res.status(400).send("You can't delete yourself!")
        }
        const parties = await partyModel.findAll({ where: { PartyOwnerID: req.body.id } });
        if (parties) {
            parties.forEach(party => {
                party.destroy()

            });
        }
        const requestsFor = await enterPartyReqModel.findAll({ where: { PartyOwnerID: req.body.id } });
        if (requestsFor) {
            requestsFor.forEach(request => {
                request.destroy()
            });
        }
        const requestsFrom = await enterPartyReqModel.findAll({ where: { UserID: req.body.id } });
        if (requestsFrom) {
            requestsFrom.forEach(request => {
                request.destroy()
            });
        }
        const participating = await participantModel.findAll({ where: { ParticipantID: req.body.id } });
        if (participating) {
            participating.forEach(e => {
                e.destroy()
            });
        }
        await user.destroy()
        res.status(200).send("User is deleted")
    } catch (error) {
        winston.error(error.stack)
        console.log(error)
        return res.status(500).send("Something failed")
    }
}
module.exports = deleteUserFunc