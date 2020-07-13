const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const foodgroupSchema = new Schema({
    name: { type: String, required: true, unique: true },
 //foodgroup: { type: mongoose.Types.ObjectId, required: true}
 //foods: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Food'}]
}   foods: { type: String, required: true}
});


foodgroupSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Foodgroup', foodgroupSchema);