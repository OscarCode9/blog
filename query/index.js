const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    posts[postId].comments = posts[postId].comments.concat({
      id,
      content,
      status: "pending",
    });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);

  console.log(posts);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");
  let res = {
    data: [],
  }
  try {
    res = await axios.get("http://localhost:4005/events");
  } catch (error) {
    console.log("error", error);
  }

  for (const event of res.data) {
    console.log("Processing event:", event.type);
    handleEvent(event.type, event.data);
  }
});
