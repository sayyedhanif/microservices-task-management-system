const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("No token");
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.headers['x-user'] = JSON.stringify(decoded);

    next();

  } catch (err) {

    return res.status(401).send("Invalid token");

  }
};
