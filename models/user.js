const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    Name:{type: String, required: true},
    Email:{type: String, required: true, unique: true},
    Password:{type: String, required: true, minlength:6},
    CellPhone: {type: String, required:true},
    Cart: [{type: mongoose.Types.ObjectId, required: true, ref: 'Cart'}]
})
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
