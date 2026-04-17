
const redisClient = require("./config/redis");

exports.getTasksList = async (req, res) => {
  const cached =
    await redisClient.get("tasks");

  if (cached) {

    return res.json(
      JSON.parse(cached)
    );

  }

  const tasks = getTasksFromDB();

  await redisClient.set(
    "tasks",
    JSON.stringify(tasks),
    { EX: 60 }
  );

  res.json(tasks);
};
