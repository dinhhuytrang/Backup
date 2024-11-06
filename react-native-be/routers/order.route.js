const express = require('express');
const OrderHistoryModel = require('../models/OrderHistory.model');
const Product = require('../models/Product.model');
const orderRouter = express.Router();

// list all club
orderRouter.post('/create', async (req, res) => {
    try {
        const orderData = req.body;
        let cart = orderData.cart;

        // Transform cart items to only necessary data
        cart = cart.map((item) => ({ product: item.product, size: item.size, quantity: item.quantity }));

        // Fetch each product's price asynchronously and calculate the total
        const total = await Promise.all(
            cart.map(async (item) => {
                const product = await Product.findById(item.product);
                return product.price * item.quantity;
            })
        ).then((prices) => prices.reduce((sum, price) => sum + price, 0));

        // Create the order with the total amount
        await OrderHistoryModel.create({
            customerName: orderData.fullName,
            items: cart,
            phoneNumber: orderData.phoneNumber,
            address: orderData.address,
            paymentMethod: orderData.paymentMethod,
            totalAmount: total,
        });

        res.status(201).json("Order created successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = orderRouter;
