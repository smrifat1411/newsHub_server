const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const newsRouter = require("./routes/newsRouter");
const { setAllBdChannels, setAllWorldChannels } = require("./controllers/newsController");
const dbConnect = require("./db/connect");
const notFound = require("./middlewares/not-found");

const port = 8080;

app.use(cors())
app.use("/api/v1/newschannels", newsRouter);
app.use(notFound);

const start = async () => {
  try {
    const dbc = await dbConnect(config.mongoURI);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
    // setImmediate(setAllBdChannels);
    // setImmediate(setAllWorldChannels);
  } catch (error) {
    console.log(error);
  }
};

start();

// setInterval(setAllBdChannels, 5000);
