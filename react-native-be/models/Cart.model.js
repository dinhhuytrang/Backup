const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    product:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }
    ,
    quantity: { type: Number, required: true, default: 1 },
    size: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('cart', CartSchema);