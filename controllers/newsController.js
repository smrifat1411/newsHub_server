const { BdNewsChannel, WorldNewsChannel } = require("../models/NewsChannel");
const axios = require("axios");

const { json } = require("express");
const { bdUrls, worldUrls } = require("../config/url");

const getAllBdChannels = async (req, res, next) => {
  const channels = await BdNewsChannel.find({});
  res.status(200).json({ channels });

  // res.send("All chanels are from database")
};

const getAllWorldChannels = async (req, res, next) => {
  const channels = await WorldNewsChannel.find({});
  res.status(200).json({ channels });

  // res.send("All chanels are from database")
};

const setAllBdChannels = async (req, res) => {
  const putReqBd = bdUrls.map((url) => axios.get(url));
  let fetchedChannels = [];

  await axios
    .all(putReqBd)
    .then(
      axios.spread((...rspns) => {
        for (let i = 0; i < rspns.length; i++) {
          if (rspns[i].data.items.length > 0) {
            fetchedChannels.push(rspns[i].data.items[0]);
          }
        }

        fetchedChannels.forEach(async (itemRes, i) => {
          let channelName = itemRes.snippet.channelTitle;
          let videoId = itemRes.id.videoId;
          const tempChannel = { channelName, videoId };
          const newsChannels = new BdNewsChannel(tempChannel);
          const queryByChannelName = {
            channelName: tempChannel.channelName,
          };
          const updateVideoId = { videoId: tempChannel.videoId };
          const updatedChannelList = await BdNewsChannel.findOneAndUpdate(
            queryByChannelName,
            updateVideoId,
            {
              upsert: true,
            }
          );
        });
        res.json({ fetchedChannels });
      })
    )

    .catch((error) => {
      // Handle any errors that occurred during the requests
      console.error("Error:", error);
    });
};

const setAllWorldChannels = async (req, res) => {
  const putReqWorld = worldUrls.map((url) => axios.get(url));
  let fetchedChannels = [];

  await axios
    .all(putReqWorld)
    .then(
      axios.spread((...rspns) => {
        for (let i = 0; i < rspns.length; i++) {
          if (rspns[i].data.items.length > 0) {
            fetchedChannels.push(rspns[i].data.items[0]);
          }
        }

        fetchedChannels.forEach(async (itemRes, i) => {
          let channelName = itemRes.snippet.channelTitle;
          let videoId = itemRes.id.videoId;
          const tempChannel = { channelName, videoId };
          const newsChannels = new WorldNewsChannel(tempChannel);
          const queryByChannelName = {
            channelName: tempChannel.channelName,
          };
          const updateVideoId = { videoId: tempChannel.videoId };
          const updatedChannelList = await WorldNewsChannel.findOneAndUpdate(
            queryByChannelName,
            updateVideoId,
            {
              upsert: true,
            }
          );
        });
        res.json({ fetchedChannels });
      })
    )

    .catch((error) => {
      // Handle any errors that occurred during the requests
      console.error("Error:", error);
    });
};

module.exports = {
  getAllBdChannels,
  setAllBdChannels,
  getAllWorldChannels,
  setAllWorldChannels,
};
