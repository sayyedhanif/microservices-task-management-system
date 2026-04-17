const logger = require("../../../helper/logger");

module.exports = (req, res, next) => {
  const startTime = new Date();

  // Log the START
  logger.logHttp(req, res, req.traceId, "START", startTime.toISOString());

  // Log the FINISH
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const finishTime = new Date().toISOString();
    logger.logHttp(req, res, req.traceId, "FINISH", finishTime, duration);
  });

  next();
};
