require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const trace = require("./middleware/trace");
const taskRouts = require("./routes/task")
const port = process.env.PORT || 3002;

const app = express();
connectDB();

app.use(express.json());

// trace middleare to get traceId
app.use(trace);

app.get("/health", async (req, res) => {

  res.status(200).send({
    status: 'ok',
    service: 'tasks-service',
    timestamp: new Date()
  });
});

// app routes
app.use("/", taskRouts)

app.listen(port, () =>
  console.log(`Task service running on port ${port}`)
);
