const express = require('express');
const cartRouter = express.Router();
const Product = require('../models/Product.model');
const Cart = require('../models/Cart.model');

// Get all cart items for a specific user
cartRouter.get('/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
});

// Add to cart
cartRouter.post('/add', async (req, res, next) => {
    try {
        const newCart=req.body
        const user=newCart.user
        const product=newCart.product
        const size=newCart.size
        const quantity=newCart.quantity

        if (!size) {
            return res.status(400).json({ message: 'Size is required' });
        }

        await Cart.create({ user, product, quantity, size })
        res.status(201).json("add successful");
    } catch (error) {
        next(error);
    }
});

module.exports = cartRouter; 
