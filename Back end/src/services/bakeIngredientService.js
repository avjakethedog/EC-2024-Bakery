const bakeIngredientModel = require('../models/bakeIngredient');
const ingredientBatchModel =  require('../models/ingredientBatch');
const ingredientModel = require('../models/ingredient');

const create = async (bakeIngreInfo) => {
    try {
      const newIngrebake = await bakeIngredientModel.create({
        ...bakeIngreInfo
      });
      if(newIngrebake){
        return {
            status: 'OK',
            message: 'Tạo thành công!',
            data: newIngrebake
          };
      }
    
    } catch (error) {
      return { status: 'ERROR', message: `${error.message}` };
    }
  };

  const getByBakeID = async (id) => {
    try {
      const results = await bakeIngredientModel.find({ bakeGood: id });
  
      if (results.length === 0) {
        return { status: 'ERROR', message: 'Không tìm thấy kết quả nào!' };
      } else {
        return {
          status: 'OK',
          message: 'Lấy thành công!',
          data: results
        };
      }
  
    } catch (error) {
      return { status: 'ERROR', message: `${error.message}` };
    }
  };
  
  const getAll = async () => {
    try {

      const exist = await bakeIngredientModel.find();

      if (exist.length === 0) {
        return { status: 'ERROR', message: 'Danh sách rỗng!' };
      }
      else{
        return {
          status: 'OK',
          message: 'Load danh sách thành công!',
          data: exist
        };
      }
    
    } catch (error) {
      return { status: 'ERROR', message: `${error.message}` };
    }
  };

  const updateLoss = async (bakeInfo) => {
    try {

        const bakeIngre = await bakeIngredientModel.find({ bakeGood: bakeInfo.bakeID });

          for (const item of bakeIngre) {
            const loss = (item.quantity * bakeInfo.quantity * bakeInfo.size);
           
            const losstotal = item.loss + loss;
         
            const IngreBatch = await ingredientBatchModel.find({ ingredient:item.ingredient });
            const Ingre = await ingredientModel.findOne({ _id: item.ingredient });


            for (const item1 of IngreBatch) {
       
                if (loss <= item1.stockQuantity) {
                    await bakeIngredientModel.updateOne(
                        { _id: item._id },
                        {  loss: losstotal}
                      );
                      const lossBatch = item1.stockQuantity - loss
                   
                      await ingredientBatchModel.updateOne(
                        { _id: item1._id },
                        { stockQuantity:lossBatch}
                      );

                    break;
                }
              }

              if (loss > IngreBatch.reduce((total, item) => total + item.stockQuantity, 0)) {
                return { status: 'ERROR', message: "Nguyên liệu " + Ingre.name + " không đủ" };
              }

          }

          return {
            status: 'OK',
            message: 'Thực thi thành công!'
          };
    } catch (error) {
      return { status: 'ERROR', message: `${error.message}` };
    }
  };

  module.exports = {
    create,getAll,getByBakeID,updateLoss
}