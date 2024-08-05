const orderService = require('../services/orderService')

const createOrder = async (req,res)=>{
    try{
        const response = await orderService.createOrder(req.body)
        return res.status(200).json(response)
    }catch (e){
        return res.status(404).json({e})
    }
}

const updateOrder = async (req,res)=>{
    try{
        const orderid = req.params.orderid;
        const response = await orderService.updateOrder(orderid,req.body)
        return res.status(200).json(response)
    }catch (e){
        return res.status(404).json({e})
    }
}

const getCart = async (req,res)=>{
    try{
        const userid = req.params.userid;
        const response = await orderService.getCart(userid)
        return res.status(200).json(response)
    }catch (e){
        return res.status(404).json({e})
    }
}

module.exports = {
    createOrder,updateOrder,getCart 
}