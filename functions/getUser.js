
const getUser = async (userModel, participantModel, PartyID) => {
    let arrayOfParticipants = []
    const participants = await participantModel.findAll({ where: { PartyID: PartyID } });
    if (participants.length > 0) {

        for (let index = 0; index < participants.length; index++) {
            const user = await userModel.findOne({ where: { id: participants[index].ParticipantID } });//Gets the name of the participant
            arrayOfParticipants.push(user.name)
        }
    }

    return arrayOfParticipants
}

module.exports = getUser