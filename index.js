const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const newsRouter = require("./routes/newsRouter");

const dbConnect = require("./db/connect");
const notFound = require("./middlewares/not-found");

const port = 9000;

app.use(cors())
app.use("/api/v1/newschannels", newsRouter);
app.use(notFound);

const start = async () => {
  try {
    const dbc = await dbConnect("mongodb+srv://rifat:908614@newshub.glyb33v.mongodb.net/?retryWrites=true&w=majority");
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();


