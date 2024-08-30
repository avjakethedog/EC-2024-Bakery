const bakeIngredientService = require('../services/bakeIngredientService')

const create = async (req,res)=>{
    try{
        const response = await bakeIngredientService.create(req.body)
        return res.status(200).json(response)
    }catch (e){
        return res.status(404).json({e})
    }
}

const getAll = async (req,res)=>{
    try{
        const response = await bakeIngredientService.getAll()
        return res.status(200).json(response)
    }catch (e){
        return res.status(404).json({e})
    }
}


const getByBakeID = async (req,res)=>{
    try{
        const id = req.params.bakeID;
        const response = await bakeIngredientService.getByBakeID(id)
        return res.status(200).json(response)
    }catch (e){
        return res.status(404).json({e})
    }
}

const updateLoss = async (req,res)=>{
    try{
        const response = await bakeIngredientService.updateLoss(req.body)
        return res.status(200).json(response)
    }catch (e){
        return res.status(404).json({e})
    }
}
module.exports = {
    create,getAll,getByBakeID,updateLoss
}