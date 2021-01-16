const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const CartControllers = require('../Controllers/cart-controllers');



// Adding a Product, Deleting a Product, Updating a Product, getProductById 
// Adding a Product  

//   '/api/products/addProduct'
router.post('/addProduct', 
            [check('Name').not().isEmpty(), 
             check('Quantity').not().isEmpty()], CartControllers.AddProduct); //to add in cart


// Searching a product by Id
//   '/api/products/:pid'
router.get('/user/:uid',CartControllers.getCartByUserId);

//Updating a Product
//    '/api/products/:pid'
router.patch('/:pid',
[check('Color').not().isEmpty(), 
check('Quantity').not().isEmpty()]
,CartControllers.updateProduct);


//Deleting a Product
//    '/api/products/:pid'
router.delete('/:pid',CartControllers.deleteProduct);



module.exports = router;