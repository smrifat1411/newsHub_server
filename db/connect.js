const mongoose = require("mongoose");



const dbConnect = (url)=>{

    return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    })
    .then(() => console.log("MongoDB Atlas Connected..."))
    .catch((err) => console.log(err));
}

module.exports = dbConnect