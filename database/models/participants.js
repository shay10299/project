'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participants = sequelize.define('Participants', {
    ParticipantID: DataTypes.INTEGER,
    PartyID: DataTypes.INTEGER
  }, {});
  Participants.associate = function(models) {
  };
  return Participants;
};