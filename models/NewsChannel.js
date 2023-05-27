const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// channel name, timestamp, videoId

const newsChannelSchema = new Schema(
  {
    channelName: {
      type: String,
      require: true,
    },
    videoId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const BdNewsChannel = mongoose.model("BdNewschannel", newsChannelSchema);
const WorldNewsChannel = mongoose.model("WordNewschannel", newsChannelSchema);

module.exports = {BdNewsChannel,WorldNewsChannel};
