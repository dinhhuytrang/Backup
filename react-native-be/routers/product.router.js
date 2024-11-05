const express = require('express');
const productRouter = express.Router();
const Product = require('../models/Product.model');

// list all products
productRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products);        
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
});
// List product top 
productRouter.get('/top', async (req, res) => {
    try {
        const products = await Product.find().limit(6); 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// product details
productRouter.get('/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const product = await Product.findById(id); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' }); 
        }
        res.status(200).json(product); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = productRouter;
