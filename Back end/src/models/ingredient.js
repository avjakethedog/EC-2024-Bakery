const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    name: { type: String,required: true, unique: true },
    description: { type: String },
    units: { type: String },
    isAllergen: {type:Boolean},
    suppliers: { type: String },
    tags :{type:String}
}, {
  timestamps: true
});

const ingredient = mongoose.model("ingredients", ingredientSchema);

module.exports = ingredient;
