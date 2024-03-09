const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken")

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
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
          {
            userInfo: {
              username: foundUser.email,
              roles: roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "300s" }
        );
        const refreshToken = jwt.sign(
          { username: foundUser.email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result)
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "None",
          // secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ accessToken });
      } else {
        res.sendStatus(401);
      }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { authenticate };