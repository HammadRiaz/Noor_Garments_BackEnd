const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes =require('./Routes/product-routes');
const UserRoutes =require('./Routes/user-routes');
const CartRoutes =require('./Routes/cart-routes');

const HttpError= require('./models/http-error');



const app=express();

app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Methods',"GET, POST, PATCH, DELETE");
  next();
})
// The URL to perform operations realted to User
// For Example: Sign IN, Log IN, Get Crate of Particular User, Adding to crate. Delete from Crate , Update in Crate
app.use('/api/users', UserRoutes);

app.use('/api/cart', CartRoutes);
// The URL to perform operations realted to Products accessed by only Admin
// For Example: Adding a Product, Deleting a Product, Updating a Product 
app.use('/api/products', productRoutes);

app.use((req, res, next)=>{
  const error = new HttpError('Could not find this route',404);
  throw error;
});


app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
  });

   

mongoose.set('useCreateIndex', true);

mongoose
.connect('mongodb+srv://Hammad:NG1234@noorgarments.cosfg.mongodb.net/NG?retryWrites=true&w=majority',{
  useUnifiedTopology: true,
  useNewUrlParser: true,
  })
.then(()=>{
  app.listen(5000);
})
.catch(err =>{
  console.log(err);
});



