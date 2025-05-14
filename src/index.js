const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const workoutRoute = require("./routes/workout");
const trainingTipRoute = require("./routes/trainingTip");
const utils = require("./utils/messages");
const app = express();
const { connectRedis } = require("./config/redis");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/user", userRoute);
app.use("/workout", workoutRoute);
app.use("/training-tips", trainingTipRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  return utils.failureResponse(err, res, 500);
});

try {
  connectRedis();
} catch (error) {
  console.log(error);
}

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected!");
    app.listen(PORT, () => console.log("Example app listening on port 3000!"));
  })
  .catch((e) => console.log(e));
