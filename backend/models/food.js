const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: { type: String, required: true, unique: true},
    details: { type: String, required: true },
    expirydate: { type: String, required: true },
    qty: { type: String, required: true },
    comments: { type: String, required: false },
//    foodgroup: { type: mongoose.Types.ObjectId, required: true}
    foodgroupid: { type: String, required: true}
});

foodSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Food', foodSchema);
