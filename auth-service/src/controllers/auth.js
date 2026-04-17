const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../../../helper/logger");

exports.register = async (req, res) => {
  logger.info(
    "Register user",
    req.traceId
  );
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed
  });

  res.json(user);
};

exports.login = async (req, res) => {
  logger.info(
    "Login user",
    req.traceId
  );
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(401).send("User with this email is not registred");

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(401).send("Wrong password");

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
};
