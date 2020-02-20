'use strict';
module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define('Party', {
    PartyName: DataTypes.STRING,
    PartyOwnerID: DataTypes.INTEGER,
    date: DataTypes.DATE,
    MaxParticipants: DataTypes.INTEGER,
    NumberOfParticipants: DataTypes.INTEGER,
    hour: DataTypes.INTEGER
  }, {});
  Party.associate = function (models) {
    Party.belongsTo(models.user, {
      foreignKey: 'PartyOwnerID',
      as: 'partyowner',
      onDelete: 'CASCADE',
    })

  };
  return Party;
};