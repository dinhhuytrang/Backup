const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  name: { type: String, required: true },
  logo_url: { type: String, required: true },
  sponsor: { type: String, required: true },
});

module.exports = mongoose.model('club', ClubSchema);
