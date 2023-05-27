const express = require("express");
const myRouter = express.Router();

// import controller
const {getAllBdChannels, getAllWorldChannels} = require("../controllers/newsController");

myRouter.route("/bd").get(getAllBdChannels);
myRouter.route("/world").get(getAllWorldChannels);

module.exports = myRouter;
