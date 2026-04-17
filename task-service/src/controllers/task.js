
const logger = require("../../../helper/logger");
const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  logger.info(
    "Adding task",
    req.traceId
  );

  const user = req.headers['x-user'] ? JSON.parse(req.headers['x-user']) : {};

  const task = await Task.create({
    title: req.body.title,
    createdBy: user.userId
  });
  res.json(task);
};

exports.getTasksList = async (req, res) => {
  logger.info(
    "Fetching tasks",
    req.traceId
  );

  const tasks = await Task.find();
  res.json(tasks || []);
};
