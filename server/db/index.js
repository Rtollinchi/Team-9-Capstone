const db = require("./db");
const User = require("./models/User");
const Task = require("./models/Task");


Task.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Task, { foreignKey: "userId" });

Task.belongsTo(Task, { as: 'parent', foreignKey: 'parentId' });
Task.hasMany(Task, { as: 'subtasks', foreignKey: 'parentId' });

module.exports = {
  db,
  models: { User, Task },
};
