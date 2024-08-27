const express = require('express');
const router = express.Router();

// Logout route
router.post('/', (req, res)=>{
    res.clearCookie("fooditem");
    const userName = req.userName;
    res.redirect('signin');
});

module.exports = router;
