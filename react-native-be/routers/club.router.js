const express = require('express');
const clubRouter = express.Router();
const Club = require('../models/Club.model');

// list all club
clubRouter.get('/', async (req, res) => {
    try {
        const products = await Club.find(); 
        res.status(200).json(products);        
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
});

module.exports = clubRouter;
