const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ['USER', 'ADMIN'], required: true },
});

module.exports = mongoose.model('user', UserSchema);
