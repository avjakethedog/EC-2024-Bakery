const mongoose = require('mongoose');

const ingredientBatchSchema = mongoose.Schema({
    ingredient: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ingredients' },
    batchNumber: { type: Number },
    stockQuantity: { type: Number, required: true },
    bestByDate: { type: Date, required: true}, 
    dateReceived: { type: Date, default: Date.now }, 
}, {
    timestamps: true
});

const ingredientBatch = mongoose.model("ingredientBatchs", ingredientBatchSchema);

module.exports = ingredientBatch;
