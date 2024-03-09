const bcrypt = require("bcrypt");
const User = require("../model/User");

const authenticate = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) {
      return res.status(403).json({ message: `User does not exist` });
    }
    const passwordMatches = await bcrypt.compare(password, foundUser.password);
    if (passwordMatches) {
      res.status(200).json({ message: `User with ${email} authenticated` });
    } else {
      res.sendStatus(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { authenticate };