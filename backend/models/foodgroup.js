const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const foodgroupSchema = new Schema({
    name: { type: String, required: true },
    creator: { type: String, required: true },
    foods: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Food'}]
}, {"strict": false });

foodgroupSchema.index({"name": 1, "creator": 1}, { "unique": true });
foodgroupSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Foodgroup', foodgroupSchema);