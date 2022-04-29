const express = require("express");

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("hello you, how are you ?");
});

app.listen(port, () => {
  console.log("*******************************");
  console.log("serveur démarré au port" + port);
  console.log("*******************************");
});
