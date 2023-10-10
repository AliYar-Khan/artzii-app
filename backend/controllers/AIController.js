const axios = require("axios");
const qs = require("qs");
require("dotenv").config();

exports.generateStory = async (req, res) => {
  try {
    let data = qs.stringify({
      topic: req.body.topic,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.hotpot.ai/story-generator",
      headers: {
        Authorization: process.env.HOTPOT_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("story --->", response.data);
        res.status(200).json({ success: true, story: response.data });
      })
      .catch((error) => {
        console.log(error);
        res.status(200).json({ success: false, error: error.message });
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.generateImage = async (req, res) => {
  try {
    let data = qs.stringify({
      inputText: req.body.topic,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.hotpot.ai/make-art",
      headers: {
        Authorization: process.env.HOTPOT_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("story --->", response.data);
        res.status(200).json({ success: true, story: response.data });
      })
      .catch((error) => {
        console.log(error);
        res.status(200).json({ success: false, error: error.message });
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
