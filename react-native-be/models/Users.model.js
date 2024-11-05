const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  fullname:{type: String},
  phoneNumber: { type: String},
  address: { type: String },
  role: { type: String, enum: ['USER', 'ADMIN'], default:"USER"},
  verificationCode: { type: String, default: null },
});

module.exports = mongoose.model('user', UserSchema);
