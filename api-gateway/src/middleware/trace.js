const { v4: UUID } = require("uuid");

module.exports = (req, res, next) => {
  const traceId = req.headers['x-request-id'] || UUID();
  req.traceId = traceId;

  res.setHeader('x-request-id', traceId);

  next();
};
