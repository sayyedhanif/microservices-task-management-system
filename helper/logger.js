// logger.js
module.exports = {
  error: (message, error, traceId = 'N/A') => {
    console.error(`[${new Date().toISOString()}] [ERROR] [${traceId}] ${message}`);
    if (process.env.DEBUG === "true" && error) console.error(error);
  },
  warn: (message, traceId = 'N/A') => {
    console.log(`[${new Date().toISOString()}] [WARN] [${traceId}] ${message}`);
  },
  info: (message, traceId = 'N/A') => {
    console.log(`[${new Date().toISOString()}] [INFO] [${traceId}] ${message}`);
  },

  // HTTP Request Logger
  logHttp: (req, res, traceId, stage = "START", time, duration) => {
    const { ip, method, originalUrl } = req;

    if (stage === "START") {
      console.log(`[${time}] [${stage}] [${traceId}] ${ip} ${method} ${originalUrl}`);
    } else if (stage === "FINISH") {
      console.log(`[${time}] [${stage}] [${traceId}] ${ip} ${method} ${originalUrl} [Status: ${res.statusCode}, Duration: ${duration}ms]`);
    }
  }
};
