const router = require("express").Router();
const {
  models: { Task },
} = require("../db");
const { requireToken } = require("./gatekeepingmiddleware");
//find all belonging to user
router.get("/", requireToken, async (req, res, next) => {
  const user = req.user;
  const userId = user.id;
  try {
    const tasks = await Task.findAll({ where: { userId } });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});
//grabs enum values for priority
router.get("/options", async (req, res, next) => {
  try {
    //grabbing values of priority from model
    const priorityValues = await Task.rawAttributes.priority.values;
    //returns array of options
    const priorityOptions = priorityValues.map((value) => ({
      label: value.charAt(0).toUpperCase() + value.slice(1),
      value,
    }));
    res.json(priorityOptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});
//find one
router.get("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
});
//create
router.post("/", async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send(task);
  } catch (err) {
    next(err);
  }
});
//update
router.put("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    res.json(await task.update(req.body));
  } catch (err) {
    next(err);
  }
});
//delete
router.delete("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    await task.destroy();
  } catch (err) {
    next(err);
  }
});
module.exports = router;
