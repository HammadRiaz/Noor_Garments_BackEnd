const { v4: uuidv4 } = require('uuid');
const { validationResult }= require('express-validator');
const ProDuct = require('../models/product');
const HttpError= require('../models/http-error');


// Adding a Product, Deleting a Product, Updating a Product, getProductById 

//Adding a Product
const AddProduct = async (req, res, next)=>{ 
    const error=validationResult(req);
    if(!error.isEmpty()){
        throw new HttpError('Invalid Input',422  );
    }
    const { Name,  Price, description, Color, clothType, companyLogo } = req.body;
    const addedProduct=new ProDuct({
        Name,
        Price,
        Color,
        Image:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.cbronline.com%2Fwp-content%2Fuploads%2F2016%2F06%2Fwhat-is-URL-770x503.jpg&imgrefurl=https%3A%2F%2Fwww.cbronline.com%2Fwhat-is%2Fwhat-is-a-url-4934011%2F&tbnid=FETvCzcvMyz-TM&vet=12ahUKEwjl5YOE2vrtAhWP4oUKHS23An0QMygBegUIARCnAQ..i&docid=anw0-1YrqcegaM&w=770&h=503&q=image%20URl&hl=en&client=firefox-b-d&ved=2ahUKEwjl5YOE2vrtAhWP4oUKHS23An0QMygBegUIARCnAQ',
        clothType, 
        companyLogo,
        description
    })
    try{
        await addedProduct.save();
    }catch(err){
        const error = new HttpError('Adding Product Failed',500);
        return next(error);
    } 
    
    res.status(201).json(addedProduct);
    
}


//getProductById 
const getProductById= async ( req, res, next) =>  {
    const ProductId= req.params.pid;
    let Product;
    try{
        Product = await ProDuct.findById(ProductId);
    }catch(err){
        const error = new HttpError('Something went Wrong during search',500);
        return next(error);
    } 


    if (!Product) { 
        const error = new HttpError('Could not find a place for the provided id.',404);
        return next(error);
    }
    
    res.json({Product: Product.toObject({ getters: true })});

};


//Updating a Product
const updateProduct = async (req, res, next)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
         return next( new HttpError('Invalid Input',422  ));
    } 
    const { Name,  Price, description, Color, clothType, companyLogo , Image } = req.body;
    const ProductID= req.params.pid;
    
    let product;
    try{
        product = await ProDuct.findById(ProductID);
    }catch(err){
        const error = new HttpError('Something went Wrong during update',500);
        return next(error);
    } 

    product.Name= Name;
    product.Price= Price;
    product.description= description;
    product.Color= Color;
    product.Image= Image;
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
        product = await ProDuct.findById(ProductID);
    }catch(err){
        const error = new HttpError('Something went Wrong, Could not delete Product',500);
        return next(error);
    } 

    try {
        await product.remove();
    }catch(err){
        const error = new HttpError('Something went Wrong, Could not delete Product',500);
        return next(error);
    } 
    res.status(200).json({message:"Product Deleted"});
}

exports.AddProduct = AddProduct;
exports.getProductById =  getProductById;
exports.updateProduct= updateProduct;
exports.deleteProduct= deleteProduct;

