const logger = require("../common/logger");

module.exports = (req, res, next) => {
  const start = Date.now();

  logger.info("HTTP request started", {
    traceId: req.traceId,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip
  });

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info("HTTP request finished", {
      traceId: req.traceId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: `${duration}ms`
    });
  });

  next();
};
