require("dotenv").config();

const express = require("express");
const proxy = require("express-http-proxy");

const authMiddleware = require("./middleware/auth");
const traceMiddleware = require("../../common/traceMiddleware");
const requestLogger = require("../../common/requestLogger");
const logger = require("../../common/logger");

const port = process.env.PORT || 3000;
const app = express();

// Middleware configuration
app.use(express.json());

// trace middleware
app.use(traceMiddleware);

// logs http request
app.use(requestLogger);

// micro services with proxy redirect
app.use("/auth",
  proxy("http://localhost:3001", {
    proxyReqOptDecorator(proxyReqOpts, srcReq) {
      proxyReqOpts.headers["x-request-id"] = srcReq.traceId;
      return proxyReqOpts;
    }
  })
);

app.use(
  "/tasks",
  authMiddleware,
  proxy("http://localhost:3002", {
    proxyReqOptDecorator(proxyReqOpts, srcReq) {
      proxyReqOpts.headers["x-request-id"] = srcReq.traceId;
      return proxyReqOpts;
    }
  })
);

// attach apps routes
app.use("/", require("./routes"));

app.listen(port, () =>
  logger.info(`API Gateway server running on port ${port}`, {
    traceId: "server-started"
  })
);
