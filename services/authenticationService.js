const bcrypt = require("bcrypt");
const User = require("../model/User");

const authenticate = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  if (!emailOrUsername || !password) {
    return res.status(400).json({ message: "Email/Username and password are required" });
  }
  try {
    let foundUser;
    if (emailOrUsername.includes("@")){
        foundUser = await User.findOne({ "email": emailOrUsername }).exec();
    }else{
        foundUser = await User.findOne({"userName": emailOrUsername}).exec()
    }

    if (!foundUser) {
      return res.status(403).json({ message: `User does not exist` });
    }
    const passwordMatches = await bcrypt.compare(password, foundUser.password);
    if (passwordMatches) {
      res.status(200).json({ message: `User with ${emailOrUsername} authenticated` });
    } else {
      res.sendStatus(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { authenticate };