const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const services = [
    { name: 'auth', url: 'http://localhost:3001/health' },
    { name: 'tasks', url: 'http://localhost:3002/health' }
  ];

  const results = await Promise.all(
    services.map(async service => {
      try {
        const res = await axios.get(service.url);
        return {
          service: service.name,
          status: res.data.status
        };
      } catch (e) {
        return {
          service: service.name,
          status: 'down'
        };
      }
    })
  );

  res.status(200).send({
    gateway: 'ok',
    services: results
  });
});

module.exports = router;
