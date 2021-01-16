const { v4: uuidv4 } = require('uuid');
const HttpError= require('../models/http-error');
const { validationResult }= require('express-validator');
const User = require('../models/user');



// const getUsers =async (req, res, next) => {
//     let users;
//     try{
//     users = await User.find({}, '-Password'); 
//     }catch(err){
//         const error = new HttpError('Fetching failed',500);
//         return next(error);
//     }
//     res.json({users: users.map(user=> user.toObject({getters: true}))})
// }

const signup = async (req, res, next) =>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return next( new HttpError('Invalid Input',422  ));
    }
    const { Name, Email, Password, CellPhone } = req.body;

    let existingUser;
    try{
     existingUser = await User.findOne({Email: Email});
    }catch(err){
        const error = new HttpError('SignUP Failed',500);
        return next(error);
    } 

    if( existingUser ){
        const error = new HttpError('User is Already Signed Up, LogIN Instead',422);
        return next(error);
    }


    const createdUser = new User({
        Name,
        Email,
        Password,
        CellPhone,
        Cart: []
    })

    try {
        await createdUser.save();
    }catch(err){
        const error = new HttpError('SignUp Failed',500);
        return next(error);
    } 

    res.status(201).json({user :createdUser.toObject({getters: true})})
}


const login = async (req, res, next) =>{
    const {Email, Password} = req.body;
    
    let existingUser;
    try{
     existingUser = await User.findOne({Email: Email});
    }catch(err){
        const error = new HttpError('Loggin In Failed',500);
        return next(error);
    } 

    if( !existingUser || existingUser.Password !== Password ){
        const error = new HttpError('Invalid Credentials',401);
        return next(error);
    }
   
    

    res.json({message:'Logged in',user: existingUser.toObject({getters: true})});
    
}  


// exports.getUsers = getUsers;
exports.signup= signup;
exports.login= login;