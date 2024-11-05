const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  color: { type: String, required: true },
  image_url: { type: String, required: true },
  gallery: [{ type: String }],
  club_id: { type: Schema.Types.ObjectId, ref: 'Club', required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'category', required: true },
});

module.exports = mongoose.model('product', ProductSchema);
