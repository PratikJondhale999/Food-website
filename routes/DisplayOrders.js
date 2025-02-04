const express = require('express');
const Order = require('../models/order');
const router = express.Router();

//Display past order for the logged-in user
const {restrictToLoggedinUserOnly} = require('../middlewares/auth');

router.get('/display',restrictToLoggedinUserOnly,async(req,res)=>{
   try{
   
    const userId = req.payload;
    console.log(userId);
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    

    res.render('orders',{orders});

   } catch (err){
        console.error(err.message);
        res.status(500).send('server error');
   } 
});


module.exports = router;