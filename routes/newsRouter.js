const express = require("express");
const myRouter = express.Router();

// import controller
const {getAllBdChannels, getAllWorldChannels, setAllBdChannels, setAllWorldChannels} = require("../controllers/newsController");

myRouter.route("/bd").get(getAllBdChannels);
myRouter.route("/world").get(getAllWorldChannels);
myRouter.route("/bdchannels").get(setAllBdChannels);
myRouter.route("/worldchannels").get(setAllWorldChannels);

module.exports = myRouter;
