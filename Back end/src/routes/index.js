const userRouter = require('./userRouter');
const bakeGoodRouter = require('./bakeGoodRouter');
const orderRouter = require('./orderRouter');
const orderItemRouter = require('./orderItemRouter');
const paypalRouter = require('./paypalRouter');
const ingredientRouter = require('./ingredientRouter');
const ingredientBatchRouter = require('./ingredientBatchRouter');
const bakeIngredientRouter = require('./bakeIngredientsRouter');

const routes = (app) =>{
    app.use('/api/user', userRouter);
    app.use('/api/bakeGood', bakeGoodRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/orderItems', orderItemRouter);
    app.use('/api/paypal', paypalRouter);
    app.use('/api/ingredient', ingredientRouter);
    app.use('/api/ingredientBatch',ingredientBatchRouter);
    app.use('/api/bakeIngredient',bakeIngredientRouter);
}

module.exports = routes