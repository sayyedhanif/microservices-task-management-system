const { v4: UUID } = require("uuid");

module.exports = (req, res, next) => {
  req.traceId =
    req.headers["x-request-id"] ||
    UUID();

  res.setHeader(
    "x-request-id",
    req.traceId
  );

  next();
};
