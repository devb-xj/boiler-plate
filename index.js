const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://unfailing35:unfailing35@cluster0.adsri.mongodb.net/",
    {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hellow world ~ ㅋㅋ"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
