const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;
const app = express();

const { authRouter } = require("./Routes/Auth");
const foodRouter = require("./Routes/Food.route");
const orderRouter = require("./Routes/Order.route");
require("./db").connectToMongoDB();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", authRouter);
app.use("/foods", foodRouter);
app.use("/orders", orderRouter);
app.get("/", (req, res) => {
  res.send("Welcome To Chuks Kitchen");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});