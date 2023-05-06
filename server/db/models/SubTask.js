const Sequelize = require("sequelize");
const db = require("../db");
const Task = require("./Task");

const SubTask = db.define("subTask", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  taskId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    reference: {
      model: Task,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  scheduledTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  priority: {
    type: Sequelize.STRING,
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = SubTask;
