require("dotenv").config();

const express = require("express");

const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const traceMiddleware = require("../../common/traceMiddleware");
const requestLogger = require("../../common/requestLogger");
const logger = require("../../common/logger");

const port = process.env.PORT || 3001;
const app = express();

// Connect to database
connectDB();

// Middleware configuration
app.use(express.json());

// trace middleware
app.use(traceMiddleware);

// logs http request
app.use(requestLogger);

// service health check api
app.get("/health", async (req, res) => {
  res.status(200).send({
    status: 'ok',
    service: 'auth-service',
    timestamp: new Date()
  });
});

// app routes
app.use("/", authRoutes);

app.listen(port, () =>
  logger.info(`Auth service running on port ${port}`, {
    traceId: "server-started"
  })
);
