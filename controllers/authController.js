// Importing the User model
const User = require("../models/User");
const dotenv = require("dotenv").config();

// Importing the JWT library
const jwt = require("jsonwebtoken");
// Importing the bcrypt library
const bcrypt = require("bcrypt");

/* REGISTER USER */

exports.register = async (req, res) => {
  try {
    // Extracting name, email, and password from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    // Creating a new User object with the extracted data
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    // Saving the new user to the database
    const savedUser = await newUser.save();
    // Sending a success response with the newly created user object
    res.status(201).json(savedUser);
  } catch (err) {
    // Sending an error response if there is a problem with creating the user
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */

exports.login = async (req, res) => {
  try {
    // Extracting email and password from the request body
    const { email, password } = req.body;

    // Finding the user with the given email
    const user = await User.findOne({ email });
    // Checking if the user exists and the password is correct
    if (!user) {
      // Sending an error response if the credentials are invalid
      return res.status(400).json({ message: "User does not exist..." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Creating a new JWT token with the user's ID and the secret key
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Delete the password key from the user object
    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    res.status(200).json({
      // Sending a success response with a message
      message: "Logged In Successfully",
      // Sending the token as data
      token,
      user: userWithoutPassword,
    });

    // res.json({ token });
  } catch (err) {
    // Sending an error response if there is a problem with finding the user
    res.status(500).json({ message: err.message });
  }
};
