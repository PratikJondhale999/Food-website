const express = require('express');
const fooditem = require('../models/fooditem');
const multer = require('multer');
const VegModel = require('../models/categories/VegModel');
const SouthIndianModel = require('../models/categories/SouthIndianModel');
const ItalianModel = require('../models/categories/ItalianModel');
const NonVegModel = require('../models/categories/NonVegModel');

const router = express.Router();


 router.get('/',(req,res) => {
    res.render('addfood');
});

const storage = multer.memoryStorage();

const upload = multer({storage:storage});


          router.post('/upload', upload.single('foodImage'), async (req, res, next) => {
            
            data = {
                bufferImg: req.file.buffer.toString('base64'),
                contentType: req.file.mimetype
            }
            src = `data:${data.contentType};base64,${data.bufferImg.toString('base64')}`;
           

            var newfooditemId;
            var newfooditem;
            
            if(req.body.category == "Veg"){
                newfooditem = await VegModel.create({
                Description: req.body.description,
                category : req.body.category,
                price: req.body.price,
                imgBuffer: src,
                fooditemId: newfooditemId,
                timeStamp: new Date()
                });
            } 
            else if(req.body.category == "Non-Veg"){
                newfooditem = await NonVegModel.create({
                Description: req.body.description,
                category : req.body.category,
                price: req.body.price,
                imgBuffer: src,
                fooditemId: newfooditemId,
                timeStamp: new Date()
                });
            }
            else if(req.body.category == "South Indian"){
                newfooditem = await SouthIndianModel.create({
                Description: req.body.description,
                category : req.body.category,
                price: req.body.price,
                imgBuffer: src,
                fooditemId: newfooditemId,
                timeStamp: new Date()
                });
            }
            else if(req.body.category == "Italian"){
                newfooditem = await ItalianModel.create({
                Description: req.body.description,
                category : req.body.category,
                price: req.body.price,
                imgBuffer: src,
                fooditemId: newfooditemId,
                timeStamp: new Date()
                });
            }

            newfooditemId= newfooditem._id;
             await fooditem.create({
                Description: req.body.description,
                category : req.body.category,
                price: req.body.price,
                imgBuffer: src,
                fooditemId: newfooditemId,
                timeStamp: new Date()
            });
            
            
            return res.redirect('/');
});

module.exports=router;
