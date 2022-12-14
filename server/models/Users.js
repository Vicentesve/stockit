const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: String,
    lastname: String,
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: String,
    gender: String,
    hasWarehouse: Boolean,
    profilePic: {
      default: "https://flowbite.com/docs/images/examples/image-2@2x.jpg",
      type: String,
    },
    settings: {
      theme: {
        type: Number,
        default: 1,
      },
    },
  },
  {
    timestamps: true,
  }
);

//Static method to login user
userSchema.statics.login = async function (email, password) {
  const user_login = await this.findOne({ email });
  if (email) {
    const auth = await bcrypt.compare(password, user_login.password);
    if (auth) {
      return user_login;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect user");
};

//Fire a function before doc save to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
