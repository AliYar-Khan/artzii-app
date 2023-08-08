// controllers/UserController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Create a new user
exports.createUser = async (req, res) => {
  try {
    console.log("====================================");
    console.log("req.body --->>>", req.body);
    console.log("====================================");
    const user = new User({
      name: req.body.name || "",
      address: req.body.address || "",
      city: req.body.city || "",
      state: req.body.state || "",
      country: req.body.country || "",
      zipCode: req.body.zipCode || "",
      phoneNumber: req.body.phoneNumber || "",
      email: req.body.email,
      password: req.body.password,
    });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log("====================================");
    console.log("error --->>", error);
    console.log("====================================");
    res.status(500).json({ error: "Failed to create a new user" });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to get users" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.name = req.body.name;
    user.address = req.body.address;
    user.city = req.body.city;
    user.state = req.body.state;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;
    user.phoneNumber = req.body.phoneNumber;
    user.email = req.body.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    await user.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.deleted = true;
    await user.save();
    res.json(204).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the user" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("====================================");
    console.log("user --->>>", user);
    console.log("====================================");
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }
    const matched = await bcrypt.compare(req.body.password, user.password);
    console.log("====================================");
    console.log("matched --->>", matched);
    console.log("====================================");
    if (!matched) {
      return res.status(401).json({ message: "Invalid password" });
    } else {
      const token = jwt.sign({ id: user.id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "8h",
      });
      console.log("====================================");
      console.log("token ---->>>", token);
      console.log("====================================");
      return res.json({
        success: true,
        token: token,
        user: {
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          city: user.city,
          country: user.country,
          state: user.state,
          zipCode: user.zipCode,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
