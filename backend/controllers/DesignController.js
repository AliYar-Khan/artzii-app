const Design = require("../models/Design");
const jwt = require("jsonwebtoken");
const axios = require("axios");

exports.addDesign = async (req, res) => {
  try {
    const design = { userId: req.user.id, ...req.body };

    const newDesign = new Design({ ...design });
    await newDesign.save();
    return res.status(200).json({ success: true, designId: newDesign._id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getDesign = async (req, res) => {
  try {
    const designId = req.params.id;
    const design = await Design.findOne({ _id: designId });
    console.log("====================================");
    console.log(
      "req.user.id , design.userId -===>>>>",
      req.user.id,
      design.userId
    );
    console.log("====================================");
    if (req.user.id === design.userId) {
      console.log("====================================");
      console.log("true");
      console.log("====================================");
      res.status(200).json({ success: true, design: design });
    } else {
      console.log("====================================");
      console.log("false");
      console.log("====================================");
      res.status(200).json({ success: false, message: "Not valid" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateDesign = async (req, res) => {};

exports.deleteDesign = async (req, res) => {};

exports.getAllDesign = async (req, res) => {
  try {
    const user = req.user;
    console.log("user --->>", user);
    const de = await Design.find({ userId: user.id });
    const result = de.map((item) => ({
      id: item._id,
      name: item.name,
      cover: item.pages[0].background,
    }));
    return res.status(200).json({ success: true, designs: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
