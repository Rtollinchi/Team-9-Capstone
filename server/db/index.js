const db = require("./db");
const User = require("./models/User");
const Task = require("./models/Task");
const SubTask = require("./models/SubTask");

Task.belongsTo(User);
User.hasMany(Task);
SubTask.belongsTo(Task);
Task.hasMany(SubTask);

module.exports = {
  db,
  models: { User, Task, SubTask },
};
