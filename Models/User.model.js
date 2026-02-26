const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  }

});

UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};
UserSchema.methods.isvalidemail = async function (email) {
  const user = this;
  const compare = await bcrypt.compare(email, user.email);
};

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
