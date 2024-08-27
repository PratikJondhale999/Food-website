const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Middleware to parse request body
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Place an Order
router.post('/', async (req, res) => {
  
  const { userId, totalAmount, deliveryAddress } = req.body;

    try {
      const newOrder = new Order({  //New order is created
      userId: req.payload,
      totalAmount,
      deliveryAddress,
    });

    //Every new order is saved
    const order = await newOrder.save();
    res.redirect('/');
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
