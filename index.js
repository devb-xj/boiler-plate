const express = require("express");
const app = express();
const port = 5000;

const config = require("./config/key");
const { User } = require("./model/User");

//application/x-www-form-urlencoded 이런 형태의 데이터를 분석해서 가져올 수 있도록 하는 설정
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//application/json 이런 형태의 데이터를 분석해서 가져올 수 있도록 하는 설정
//app.use(bodyParser.json());
app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hellow world ~ ㅎㅎ"));

app.post("/register", async (req, res) => {
  //회원가입에 필요한 정보들을 Client에서 수신받아 데이터베이스에 저장
  const user = new User(req.body);
  //MongoDB method
  //   user.save((err, userInfo) => {
  //     if (err) return res.json({ success: false, err });
  //     return res.status(200).json({ success: true });
  //   });
  await user
    .save()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        success: false,
        err: err,
      });
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
