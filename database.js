var db = require("./models/index");
var User = db.sequelize.import("./models/user.js");
var Directory = db.sequelize.import("./models/directory");
var UserDirectory = db.sequelize.import("./models/userdirectory");

module.exports = {
  addUser: (usr, directories) => {
    return new Promise((res, rej) => {
      const allDirs = [];
      directories.forEach(dir => {
        allDirs.push(
          Directory.findOrCreate({
            where: { path: dir.path },
            defaults: { path: dir.path }
          })
        );
      });
      Promise.all(allDirs)
        .then(async dirs => {
          var tempDirs = [];
          dirs.map(val => {
            tempDirs.push(val[0].get({ plain: true }));
          });
          const user = await User.create(usr);
          console.log(tempDirs);
          console.log(user.get({ plain: true }).id);
          tempDirs.forEach(dir => {
            UserDirectory.create({
              user_id: user.get({ plain: true }).id,
              directory_id: dir.id
            });
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
      UserDirectory.destroy({
        where: {
          user_id: userId
        }
      })
        .then(() => {
          res(true);
        })
        .catch(err => rej(err));
    });
  }
};
