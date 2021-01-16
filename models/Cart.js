const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    ProductID:{type: String, required: true},
    Creator:{type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    Name:{type: String, required: true},
    Color: {type: String, required: true},
    clothType:{type: String, required: true},
    companyLogo:{type: Boolean, required: true},
    Quantity:{type: Number, required: true}
})

module.exports = mongoose.model('Cart', cartSchema);