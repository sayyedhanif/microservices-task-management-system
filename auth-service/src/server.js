require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const trace = require("./middleware/trace");
const port = process.env.PORT || 3001;

const app = express();
connectDB();

app.use(express.json());

// trace middleare to get traceId
app.use(trace);

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
  console.log(`Auth service running on port ${port}`)
);
