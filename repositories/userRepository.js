var db = require("../models/index");
var User = db.sequelize.import("../models/user.js");
var Directory = db.sequelize.import("../models/directory.js");
var directoryRepository = require("./directoryRepository");
var userDirectoryRepository = require("./userDirectoryRepository");

module.exports = {
  addUser: (usr, directories) => {
    return new Promise((res, rej) => {
      const allDirs = directoryRepository.addDirectories(directories);
      Promise.all(allDirs)
        .then(async dirs => {
          var tempDirs = [];
          dirs.map(val => {
            tempDirs.push(val[0].get({ plain: true }));
          });
          const user = await User.create(usr);
          tempDirs.forEach(dir => {
            userDirectoryRepository.addUserDirectory(
              user.get({ plain: true }).id,
              dir.id
            );
          });
          res(true);
        })
        .catch(err => rej(err));
    });
  },
  getAllUsers: () => {
    return new Promise(async (res, rej) => {
      User.findAll({
        include: [
          {
            model: Directory,
            nested: true,
            attributes: ["id", "path"],
            through: { attributes: [] }
          }
        ]
      }).then(users => {
        const nodeData = users.map(user => user.get({ plain: true }));
        res(nodeData);
      });
    });
  },
  deleteUser: userId => {
    return new Promise(async (res, rej) => {
      User.destroy({
        where: {
          id: userId
        }
      });

      const success = await userDirectoryRepository.deleteUserDirectory(userId);
      res(success);
    });
  },
  findUser: userId => {
    return new Promise((res, rej) => {
      User.findOne({
        where: {
          id: userId
        },
        include: [
          {
            model: Directory,
            nested: true,
            attributes: ["id", "path"],
            through: { attributes: [] }
          }
        ]
      }).then(user => {
        res(user);
      });
    });
  },
  editUser: (usr, directories) => {
    return new Promise(async (res, rej) => {
      const success = await userDirectoryRepository.deleteUserDirectory(usr.id);
      const allDirs = directoryRepository.addDirectories(directories);
      Promise.all(allDirs).then(async dirs => {
        var tempDirs = [];
        dirs.map(val => {
          tempDirs.push(val[0].get({ plain: true }));
        });
        const user = await module.exports.findUser(usr.id);
        user.update({
          email: usr.email,
          password: usr.password,
          name: usr.name
        });
        tempDirs.forEach(dir => {
          userDirectoryRepository.addUserDirectory(
            user.get({ plain: true }).id,
            dir.id
          );
        });
        directoryRepository.removeUnused();
        res(true);
      });
    });
  }
};
