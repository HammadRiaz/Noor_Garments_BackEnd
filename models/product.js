const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    Name:{type: String, required: true},
    Price:{type: Number, required: true}, 
    Color: {type: String, required: true},
    Image: {type: String, required: true},
    clothType:{type: String, required: true},
    companyLogo:{type: Boolean, required: true},
    description:{type: String, required: true}
})

module.exports = mongoose.model('Product', productSchema);