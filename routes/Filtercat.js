const express = require('express');
const VegModel = require('../models/categories/VegModel');
const SouthIndianModel = require('../models/categories/SouthIndianModel');
const ItalianModel = require('../models/categories/ItalianModel');
const NonVegModel = require('../models/categories/NonVegModel');

const router = express.Router();

// Maped category names to their corresponding models
const categoryModels = {
    'Veg': VegModel,
    'Non-Veg': NonVegModel,
    'South Indian': SouthIndianModel,
    'Italian': ItalianModel,
    
};


const models = [VegModel, SouthIndianModel, ItalianModel, NonVegModel];

router.get('/filter', async (req, res) => {
console.log(req.query);
    const { category, minPrice, maxPrice, search } = req.query;
        let query = {};
        let searchs = category

    // Builded the price range query

    if (minPrice || maxPrice) {

        query.price = {};

        if (minPrice) query.price.$gte = parseFloat(minPrice);

        if (maxPrice) query.price.$lte = parseFloat(maxPrice);

    }



    // Added search query for product name and description

    if (typeof searchs === 'string' && searchs.trim() !== '') {

        const searchRegex = new RegExp(searchs.trim(), 'i');

        query.$or = [

            { name: searchRegex }, // Search by name

            { Description: searchRegex } // Search by description

        ];

    }

   


    let filteredItems = [];
   
    try {

        if (category && categoryModels[category]) {

            // If a valid category is found, filter using that model
           
            filteredItems = await categoryModels[category].find(query);
           

        } else {

            // If category is invalid or not provided, search across all categories

            const models = Object.values(categoryModels);
            const queries = models.map(model => model.find(query));
            console.log("queries")

            filteredItems = (await Promise.all(queries)).flat();

        }


            // Pagination logic

        const limit = 4;

        const totalPages = Math.ceil(filteredItems.length / limit);



        // Render results 

        res.render('filtercat', { allfood: filteredItems, totalPages, limit });
        

    } catch (error) {

        console.error('Error fetching food items:', error);

        res.status(500).send('Internal Server Error');

    }

});

module.exports = router;
