const User = require('../model/User')
const bcrypt = require('bcrypt')
const mailService = require('./mailService')


const registerUser = async (req, res) => {
    const {firstName, lastName, email, userName, password} = req.body;
    
    if (!firstName || !lastName || !email || !userName || !password){
       return res.status(400).json({"message": "Please provide full details"});
    }
    const duplicateEmail = await User.findOne({"email": email})
    const duplicateUserName =  await User.findOne({"userName": userName})
    if (duplicateEmail) {
        return res.status(409).json({"message": `Account with email ${email} exists. Please proceed to login`});
    }
    if (duplicateUserName) {
        return res.status(409).json({"message": `Username ${userName} is taken`});
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "userName" : userName,
            "password": hashedPassword
        });
        await mailService.sendMail(email, "Welcome to our platform", "You have successfully created an account");
        console.log(createdUser);
        return res.status(201).json({"message": `New user ${userName} created successfully`});
    } catch (err) {
        console.error("Error registering user:", err);
        return res.status(500).json({"message": err.message});
    }
};


module.exports = {registerUser}