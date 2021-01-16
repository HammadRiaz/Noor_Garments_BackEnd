const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const ProductControllers = require('../Controllers/products-controllers');



// Adding a Product, Deleting a Product, Updating a Product, getProductById 
// Adding a Product  

//   '/api/products/addProduct'
router.post('/addProduct', 
            [check('Name').not().isEmpty(), 
             check('Price').not().isEmpty()], ProductControllers.AddProduct); //to add in cart


// Searching a product by Id
//   '/api/products/:pid'

router.get('/:pid',ProductControllers.getProductById);

// Searching a product by Name
// router.get('/:pid',ProductControllers.getProductById);

//Updating a Product
//    '/api/products/:pid'
router.patch('/:pid',
[check('Name').not().isEmpty(), 
check('Price').not().isEmpty()]
,ProductControllers.updateProduct);


//Deleting a Product
//    '/api/products/:pid'
router.delete('/:pid',ProductControllers.deleteProduct);



module.exports = router;