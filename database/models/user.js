'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    password: DataTypes.STRING,
    IsAdmin: DataTypes.BOOLEAN
  }, {});
  User.associate = function (models) {
    User.hasMany(models.party, {
      foreignKey: 'PartyOwnerID',
      as: 'parties',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.partyrequest, {
      foreignKey: 'UserID',
      as: 'Partycreaterequests',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
