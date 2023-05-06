const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");

const Task = db.define("task", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    reference: {
      model: User,
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
  },
  dueDate: {
    type: Sequelize.DATE,
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

module.exports = Task;
