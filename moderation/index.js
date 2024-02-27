const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    try {
      await wait(5000);
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: {
          ...data,
          status,
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
