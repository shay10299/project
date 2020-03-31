'use strict';
module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define('Party', {
    PartyName: DataTypes.STRING,
    PartyOwnerID: DataTypes.INTEGER,
    date: DataTypes.DATE,
    NumberOfParticipants: DataTypes.INTEGER,
    hour: DataTypes.INTEGER
  }, {});
  Party.associate = function (models) {
    Party.belongsTo(models.User, {
      foreignKey: 'PartyOwnerID',
      as: 'partyowner',
      onDelete: 'CASCADE',
    })

  };
  return Party;
};