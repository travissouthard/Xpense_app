// {
//     "username": "amarino",
//     "email": "user@gmail.com", 
//     "password": "password", //has to be 7 characters long
//     "passwordCheck": "password",
// }

const express = require("express");
const user = express.Router();
const jwt = require("jsonwebtoken")
const auth = require("../middleware/user_auth.js")
const User = require("../models/user.js")

user.post('/register', async (req, res) => {
    try {
        let { username, email, password, passwordCheck } = req.body;
        //this code validates the username, email, and psw
        if (!username || !email || !password || !passwordCheck)
            return res.status(400).json({
                msg: "Incomplete field."
            })
        if (password !== passwordCheck)
            return res.status(400).json({
                msg: "Please verify the password."
            })
        if (password.length < 7)
            return res.status(400).json({
                msg: "Choose a password that is at least 7 characters long."
                })

        const createdUser = await User.findone({ email: email })
        if (createdUser)
            return res.status(400).json({
                msg: "Sorry, email already exists."
            })

        const createdUser = await User.findone({ email: email })
        if (createdUsername)
            return res.status(400).json({ msg: "Sorry, username already exists." })

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            username,
            password: passwordHash, 
        })
        const savedUser = await newUser.save()
            res.json(savedUser)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
    //validation of email and password for logged in user
    if (!email || !password)
    return res.status(400).json({
        msg: "Incomplete field."
    })

    const user = await Uswer.findone({ email: email })
    if (!user)
    return res.status(400).json({ msg: "No account with this email exists."})

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return res.status(400).json({ msg: "Invalid password."})

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)
    res.json({ 
        token, 
        user: { 
            id: user._id, 
            email: user.email, 
        }})
} catch (err) {
    res.status(500).json({error: err.message})
}
})

router.delete("/delete", auth, async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.user);
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
      displayName: user.displayName,
      id: user._id,
    });
  });

module.exports = user

//worked through MERN auth tutorial on https://youtu.be/BKiiXXVb69Y and https://github.com/jgbijlsma/mern-auth-template-back/blob/master/routes/userRouter.js