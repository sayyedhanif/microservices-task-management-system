const mongoose = require("mongoose");

const logger = require("../../../common/logger");

const connectDB = async () => {
  await mongoose.connect(process.env.CONNECTION_URI);
  logger.info("Auth DB connected", {
    traceId: "database-connected"
  });
};

module.exports = connectDB;
