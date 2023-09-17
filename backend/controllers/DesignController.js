const Design = require("../models/Design");
const jwt = require("jsonwebtoken");
const axios = require("axios");

exports.addDesign = async (req, res) => {
  try {
    const design = req.body;
    const newDesign = new Design({ ...design });
    await newDesign.save();
    return res.status(200).json({ success: true, designId: newDesign._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDesign = async (req, res) => {};

exports.updateDesign = async (req, res) => {};

exports.deleteDesign = async (req, res) => {};

exports.getAllDesign = async (req, res) => {};
