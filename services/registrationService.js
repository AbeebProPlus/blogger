const User = require("../model/User");
const bcrypt = require("bcrypt");
const mailService = require("./mailService");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT;
const  {log} = require('../utils/logger')

const registerUser = async (req, res) => {
  const { firstName, lastName, email, userName, password } = req.body;

  if (!firstName || !lastName || !email || !userName || !password) {
    return res.status(400).json({ message: "Please provide full details" });
  }
  const duplicateEmail = await User.findOne({ email: email }).exec();
  const duplicateUserName = await User.findOne({ userName: userName });
  if (duplicateEmail) {
    return res.status(409).json({
      message: `Account with email ${email} exists. Please proceed to login`,
    });
  }
  if (duplicateUserName) {
    return res.status(409).json({ message: `Username ${userName} is taken` });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationToken = jwt.sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      userName: userName,
      password: hashedPassword,
      confirmationToken: confirmationToken,
    });
    const confirmationLink = `http://localhost:${PORT}/registration/confirm-email?token=${confirmationToken}`;

    await mailService.sendMail(
      email,
      "Confirm Your Email",
      `Please click the following link to confirm your email: ${confirmationLink}`
    );
    log(`User ${userName} with ${email} successfully registered.`, 'registration.txt')
    return res.status(201).json({
      message: `User ${userName} registered successfully. Please check your email to confirm your account.`,
    });
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json({ message: err.message });
  }
};

const confirmEmail = async (req, res) => {
  const { token } = req.query;
  if (!token)
    return res
      .status(400)
      .json({ message: "Please check the url link sent to your inbox" });
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOneAndUpdate(
      { email: decoded.email },
      { enabled: true, confirmationToken: null },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    log(`User with ${user.email} confirmed and enabled.`, 'enabled.txt')
    return res.status(200).json({ message: "Email confirmed successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  if (!email) return res.status(400).json({ message: "Provide your address" });
  try {
    const confirmationToken = jwt.sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const resetPasswordLink = `http://localhost:${PORT}/registration?token=${confirmationToken}`;
    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser)
      return res
        .status(200)
        .json({
          message:
            "A password reset email has been sent to the provided email address if it exists in our system. Please check your inbox",
        });
    await mailService.sendMail(
      email,
      "Confirm Your Email",
      `Please click the following link to confirm your email: ${resetPasswordLink}`
    );
    return res
      .status(200)
      .json({
        message:
          "A password reset email has been sent to the provided email address if it exists in our system. Please check your inbox",
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.query;
  const {newPassword} = req.body
  if (!token)
    return res
      .status(400)
      .json({ message: "Please check the url link sent to your inbox" });
  if (!newPassword) return res.status(400).json({message: "Please provide new password"})
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({email: decoded.email }).exec()
    if (!user) return res.sendStatus(404)
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword
    await user.save()
    return res.status(200).json({message: "Password reset successfully"})
  }catch(err){
    return res.status(500).json({message: err.message})
  }
};

module.exports = { registerUser, confirmEmail, forgotPassword, resetPassword };
