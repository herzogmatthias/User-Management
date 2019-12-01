var db = require("../models/index");
var Directory = db.sequelize.import("../models/directory");
var userDirectoryRepository = require("./userDirectoryRepository");
module.exports = {
  addDirectories: directories => {
    const allDirs = [];
    directories.forEach(dir => {
      allDirs.push(
        Directory.findOrCreate({
          where: { path: dir.name },
          defaults: { path: dir.name }
        })
      );
    });
    return allDirs;
  },
  removeUnused: () => {
    Directory.findAll().then(directories => {
      const data = directories.map(directory => directory.get({ plain: true }));
      console.log(data);
      data.forEach(async directory => {
        const success = await userDirectoryRepository.find(directory.id);
        if (!success) module.exports.deleteDirectory(directory.id);
      });
    });
  },
  deleteDirectory: directory_id => {
    Directory.destroy({ where: { id: directory_id } });
  }
};
