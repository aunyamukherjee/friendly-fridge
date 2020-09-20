const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: { type: String, required: true, unique: true},
    details: { type: String, required: true },
    expirydate: { type: String, required: true },
    qty: { type: String, required: true },
    foodgroupid: { type: mongoose.Types.ObjectId, required: true, ref: 'Foodgroup'}
});

foodSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Food', foodSchema);
