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
cartRouter.post('/:userId/add', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const { productId, quantity = 1, size } = req.body;

        if (!size) {
            return res.status(400).json({ message: 'Size is required' });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        const existingProduct = cart.products.find(item => item.productId.toString() === productId && item.size === size);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity, size });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
       next(error);
    }
});

module.exports = cartRouter; 
