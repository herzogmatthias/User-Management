"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    User.belongsToMany(models.Directory, {
      through: models.UserDirectory,
      foreignKey: { field: "user_id", name: "userId" }
    });
  };
  return User;
};
