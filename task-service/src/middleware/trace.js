module.exports = (req, res, next) => {
  req.traceId = req.headers["x-request-id"] || "N/A";
  next();
};