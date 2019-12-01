var db = require("../models/index");
var UserDirectory = db.sequelize.import("../models/userdirectory");
module.exports = {
  addUserDirectory: (user_id, directory_id, read, write) => {
    UserDirectory.create({
      user_id: user_id,
      directory_id: directory_id,
      read: read,
      write: write,
    });
  },
  deleteUserDirectory: user_id => {
    return new Promise((res, rej) => {
      UserDirectory.destroy({
        where: {
          user_id: user_id
        }
      })
        .then(() => {
          res(true);
        })
        .catch(err => rej(err));
    });
  },
  find: directory_id => {
    return new Promise((res, rej) => {
      UserDirectory.findOne({ where: { directory_id: directory_id } }).then(
        userDirectory => {
          if (userDirectory == null) res(false);
          else res(true);
        }
      );
    });
  }
};
