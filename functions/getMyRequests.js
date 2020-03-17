
const winston = require('winston')

const getMyRequests = async (enterPartyModel, req, res) => {
    try {
        const requests = await enterPartyModel.findAll({ where: { UserID: req.user._id } });
        if (requests.length > 0) {
            res.status(200).send(requests)
        }
        else {
            res.status(404).send("No requests found")
        }
    } catch (e) {
        winston.error(e.stack)
        return res.status(500).send("Something failed")
    }

}
module.exports = getMyRequests