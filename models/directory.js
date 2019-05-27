"use strict";
module.exports = (sequelize, DataTypes) => {
  const Directory = sequelize.define(
    "Directory",
    {
      path: DataTypes.STRING
    },
    {}
  );
  Directory.associate = function(models) {
    Directory.belongsToMany(models.User, {
      through: models.UserDirectory,
      foreignKey: { field: "directory_id", name: "directoryId" }
    });
  };
  return Directory;
};
