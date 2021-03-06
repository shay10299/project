'use strict';
module.exports = (sequelize, DataTypes) => {
  const enterpartyrequest = sequelize.define('enterpartyrequest', {
    PartyID: DataTypes.INTEGER,
    UserID: DataTypes.INTEGER,
    PartyOwnerID: DataTypes.INTEGER,
    requestDate: DataTypes.DATE,
    confirmedByPartyOwner: DataTypes.BOOLEAN
  }, {});
  enterpartyrequest.associate = function (models) {
    enterpartyrequest.belongsTo(models.User, {
      foreignKey: 'UserID',
      as: 'partyowner',
      onDelete: 'CASCADE',
    })
  };
  return enterpartyrequest;
};