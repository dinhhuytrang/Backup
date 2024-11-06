const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        size: { type: String },
        quantity: { type: Number, required: true }
    }],
    phoneNumber: { type: String },
    address: { type: String },
    paymentMethod: { type: String },
    totalAmount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('orderHistory', orderSchema);
