const mongoose = require("mongoose");
const { token } = require("morgan");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
    required: true
  },
  company: {
    type: String,
    maxLength: 50,
    required: true
  },
  address: {
    type: String,
    maxLength: 50,
  },
  phone: {
    type: Number,
    maxLength: 15,
  },
  email: {
    type: String,
    maxLength: 50,
    required: true
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 100,
    required: true
  },

  refreshJWT: {
    token: {
      type: String,
      maxLength:500,
      default: ""
    },
    addedAt: {
      type: Date,
      required: true,
      default: Date.now,
    }
  }
});


module.exports = ({
    UserSchema: mongoose.model("User", UserSchema),
})