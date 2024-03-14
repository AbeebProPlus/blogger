const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const authenticate = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  if (!emailOrUsername || !password) {
    return res
      .status(400)
      .json({ message: "Email/Username and password are required" });
  }
  try {
    let foundUser;
    if (emailRegex.test(emailOrUsername)) {
      foundUser = await User.findOne({ email: emailOrUsername }).exec();
    } else {
      foundUser = await User.findOne({ userName: emailOrUsername }).exec();
    }
    if (!foundUser) {
      return res.status(403).json({ message: `User does not exist` });
    }
    if (!foundUser.enabled) {
      return res.status(403).json({
        message: `Please verify your email address before logging in`,
      });
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
      console.log(result);
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

const changePassword = async (req, res) => {
  const { userId, newPassword, oldPassword } = req.body;
  if (!userId || !newPassword || !oldPassword) {
    return res
      .sendStatus(400)
      .json({ message: "Provide user Id, old password and new password" });
  }
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) return res.status(404).json({ message: `User not found` });
    const passwordMatches = await bcrypt.compare(
      oldPassword,
      foundUser.password
    );
    if (!passwordMatches)
      return res
        .status(401)
        .json({ message: "Password does not match with current password" });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    foundUser.password = hashedPassword;
    await foundUser.save();
    return res.status(200).json({ message: "Password changed successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { authenticate, changePassword };
