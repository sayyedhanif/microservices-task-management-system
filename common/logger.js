const SERVICE_NAME = process.env.SERVICE_NAME || "unknown-service";

function log(level, message, meta = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    service: SERVICE_NAME,
    traceId: meta.traceId || "N/A",
    message,
    ...meta
  };

  console.log(JSON.stringify(logEntry));
}

module.exports = {
  info: (message, meta) =>
    log("info", message, meta),

  warn: (message, meta) =>
    log("warn", message, meta),

  error: (message, meta) =>
    log("error", message, meta),
};
