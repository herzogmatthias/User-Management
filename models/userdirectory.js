'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserDirectory = sequelize.define('UserDirectory', {
    user_id: DataTypes.INTEGER,
    directory_id: DataTypes.INTEGER
  }, {});
  UserDirectory.associate = function(models) {
  };
  return UserDirectory;
};