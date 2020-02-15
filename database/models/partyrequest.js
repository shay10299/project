'use strict';
module.exports = (sequelize, DataTypes) => {
  const PartyRequest = sequelize.define('PartyRequest', {
    UserID: DataTypes.INTEGER,
    date: DataTypes.DATE,
    confirmedByadmin: DataTypes.BOOLEAN
  }, {});
  PartyRequest.associate = function (models) {
    PartyRequest.belongsTo(models.user, {
      foreignKey: 'UserID',
      as: 'partyowner',
      onDelete: 'CASCADE',
    })
  };
  return PartyRequest;
};