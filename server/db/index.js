const db = require("./db");
const User = require("./models/User");
const Task = require("./models/Task");
const SubTask = require("./models/SubTask");

Task.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Task, { foreignKey: "userId" });
SubTask.belongsTo(Task, { foreignKey: "taskId" });
Task.hasMany(SubTask, { foreignKey: "taskId" });

module.exports = {
  db,
  models: { User, Task, SubTask },
};
