const mongoose = require("mongoose");
const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    enum: ["available", "unavailable", "out of stock"],
    default: "available",
  },
});
const FoodModel = mongoose.model("foods", FoodSchema);

module.exports = FoodModel;