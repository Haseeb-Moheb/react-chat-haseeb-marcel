const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    try {
        const user = new User({
            firstName: req.body.first,
            lastName: req.body.last,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 7),
        });
        const newUser = await user.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT, {
            expiresIn: "5 days",
        });

        newUser
            ? res.status(200).json({
                  user: newUser,
                  message: "Success! User Created",
                  token,
              })
            : res.status(404).json({
                  message: "Incomplete",
              });
    } catch (err) {
        res.status(500).json({
            Error: err.message,
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) throw new Error("Email or Password does not match");

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) throw new Error("Email or Password does not match");

        const token = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: 60 * 60 * 24,
        });
        email
            ? res.status(200).json({
                  user,
                  token,
              })
            : res.status(404).json({
                  message: "Something went wrong",
              });
    } catch (err) {
        res.status(500).json({
            Error: err.message,
        });
    }
});

module.exports = router;

/* {
    "firstName": "John",
    "lastName": "Wick",
    "email": "jwick@puppyfinder.com",
    "password": "focusCommitment1979"
} */
