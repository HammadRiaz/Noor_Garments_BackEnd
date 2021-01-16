const { validationResult }= require('express-validator');
const Cart = require('../models/Cart');
const HttpError= require('../models/http-error');
const User = require('../models/user');
const mongoose = require('mongoose');
// Adding a Product, Deleting a Product, Updating a Product, getProductById 

//Adding a Product
const AddProduct = async (req, res, next)=>{ 
    const error=validationResult(req);
    if(!error.isEmpty()){
        throw new HttpError('Invalid Input',422  );
    }
    const {ProductID, Creator, Name, Color, clothType, companyLogo, Quantity } = req.body;
    const addedProduct=new Cart({
        ProductID,
        Creator,
        Name,
        Color,
        clothType, 
        companyLogo,
        Quantity
    })

    let user;
    try{
        user = await User.findById(Creator);
    }catch(err){
        const error = new HttpError('Adding Product Failed',500);
        return next(error);
    } 
    
    if(!user){
        const error = new HttpError('Couldnt find the user for provided id',404);
        return next(error);
    }

    console.log(user);

    try{
        const ses = await mongoose.startSession();
        ses.startTransaction();
        
            await addedProduct.save({ session: ses});
            user.Cart.push(addedProduct);
            await user.save({session: ses});
        
        await ses.commitTransaction();

    }catch(err){
        const error = new HttpError('Adding Product to Storage Failed',500);
        return next(error);
    } 
    
    res.status(201).json({product: addedProduct});
    
}

//Updating a Product
const updateProduct = async (req, res, next)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
         return next( new HttpError('Invalid Input',422  ));
    } 
    const {  Color, clothType, companyLogo, Quantity  } = req.body;
    const ProductID= req.params.pid;
    
    let product;
    try{
        product = await Cart.findById(ProductID);
    }catch(err){
        const error = new HttpError('Something went Wrong during update',500);
        return next(error);
    } 


    product.Quantity= Quantity
    product.Color= Color;
    product.clothType= clothType;
    product.companyLogo= companyLogo;

    try {
        await product.save();
    }catch(err){
        const error = new HttpError('Something went Wrong , Could not Update',500);
        return next(error);
    } 
    res.status(200).json({product : product.toObject( {getters: true})})
}


//Deleting a Product
const deleteProduct = async (req, res, next)=>{
    const ProductID= req.params.pid;
    


    let product;
    try{
        product = await Cart.findById(ProductID).populate('Creator');
    }catch(err){
        const error = new HttpError('Something went Wrong, Could not delete Product',500);
        return next(error);
    } 

    if(!product){
        const error = new HttpError('Could not find product for provided id',404);
        return next(error);
    }

    try {
        const ses = await mongoose.startSession();
        ses.startTransaction();
        
            await product.remove({session: ses});
            product.Creator.Cart.pull(product);
            await product.Creator.save({session: ses});
        
        await ses.commitTransaction();

    }catch(err){
        const error = new HttpError('Something went Wrong, Could not delete Product',500);
        return next(error);
    } 
    res.status(200).json({message:"Product Deleted"});
}

const getCartByUserId = async (req, res, next) => {
    const userId = req.params.uid;
  
    // let places;
    let userWithPlaces;
    try {
      userWithPlaces = await User.findById(userId).populate('Cart');
    } catch (err) {
      const error = new HttpError(
        'Fetching places failed, please try again later.',
        500
      );
      return next(error);
    }
  
    // if (!places || places.length === 0) {
    if (!userWithPlaces || userWithPlaces.places.length === 0) {
      return next(
        new HttpError('Could not find places for the provided user id.', 404)
      );
    }
  
    res.json({ places: userWithPlaces.places.map(place => place.toObject({ getters: true })) });
  };
  
exports.AddProduct = AddProduct;
exports.updateProduct= updateProduct;
exports.deleteProduct= deleteProduct;
exports.getCartByUserId = getCartByUserId;