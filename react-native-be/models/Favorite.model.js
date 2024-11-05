const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  product_id: { type: Schema.Types.ObjectId, ref: 'product', required: true },
});

module.exports = mongoose.model('favorite', FavoriteSchema);
