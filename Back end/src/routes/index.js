const userRouter = require('./userRouter');
const bakeGoodRouter = require('./bakeGoodRouter');

const routes = (app) =>{
    app.use('/api/user', userRouter);
    app.use('/api/bakeGood', bakeGoodRouter);
}

module.exports = routes