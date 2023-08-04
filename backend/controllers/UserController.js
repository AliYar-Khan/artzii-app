// controllers/UserController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
// Create a new user
exports.createUser = async (req, res) => {
  console.log("====================================");
  console.log("inside create user func");
  console.log("====================================");
  try {
    const {
      name,
      address,
      city,
      state,
      country,
      zipCode,
      phoneNumber,
      email,
      password,
    } = req.body;
    const user = new User({
      name,
      address,
      city,
      state,
      country,
      zipCode,
      phoneNumber,
      email,
      password,
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
//
