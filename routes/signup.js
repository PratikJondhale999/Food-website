const express = require('express');
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt');  //bycrpt library required for hasing password
const saltRounds = 10;


//Route to handle rendering signUp page
 router.get('/',(req,res) =>{
    res.render('signUp');
});

router.post("/submit", async(req,res) => {

    try{
        
        var hashPassword = await bcrypt.hash(req.body.password,saltRounds); //Password is hashed before storing in database
    
        await User.create({  // .create method of mongoose is is used to create the new user
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashPassword,
    });
    res.render("tempRedirect");
}

catch(e){
    return res.status(500).json({
        status: "failed",
        message: e.message
    })
}
});

module.exports=router;



