const express = require("express");
const router = express.Router();

const { createTask, getTasksList } = require("../controllers/task");

router.get("/", getTasksList);
router.post("/", createTask);


module.exports = router;
