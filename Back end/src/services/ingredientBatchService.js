const ingredientBatchModel = require('../models/ingredientBatch')

const create = async (ingreBatchInfo) => {
    try {
      const count = await ingredientBatchModel.countDocuments();
      const newIngrebatch = await ingredientBatchModel.create({
        ...ingreBatchInfo,
        batchNumber: count + 1
      });
      if(newIngrebatch){
        return {
            status: 'OK',
            message: 'Tạo lô nguyên liệu thành công thành công!',
            data: newIngrebatch
          };
      }
    
    } catch (error) {
      return { status: 'ERROR', message: `${error.message}` };
    }
  };

  const getByIngreID = async (id) => {
    try {
      const results = await ingredientBatchModel.find({ ingredient: id });
  
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

      const exist = await ingredientBatchModel.find();

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

  module.exports = {
    create,getAll,getByIngreID
}