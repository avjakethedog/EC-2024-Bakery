const ingredientBatchService = require('../services/ingredientBatchService')

const create = async (req,res)=>{
    try{
        const response = await ingredientBatchService.create(req.body)
        return res.status(200).json(response)
    }catch (e){
        return res.status(404).json({e})
    }
}

const getAll = async (req,res)=>{
    try{
        const response = await ingredientBatchService.getAll()
        return res.status(200).json(response)
    }catch (e){
        return res.status(404).json({e})
    }
}


const getByIngreID = async (req,res)=>{
    try{
        const id = req.params.ingreID;
        const response = await ingredientBatchService.getByIngreID(id)
        return res.status(200).json(response)
    }catch (e){
        return res.status(404).json({e})
    }
}

module.exports = {
    create,getAll,getByIngreID
}