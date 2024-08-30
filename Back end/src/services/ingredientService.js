const ingredientModel = require('../models/ingredient')

const create = async (ingreInfo) => {
    try {
      const exist = await ingredientModel.findOne({ name: ingredientModel.name });
      if (exist) {
        return { status: 'ERROR', message: 'Tên nguyên liệu đã tồn tại' };
      }

      const newIngre = await ingredientModel.create({
        ...ingreInfo
      });
      if(newIngre){
        return {
            status: 'OK',
            message: 'Tạo nguyên liệu thành công!',
            data: newIngre
          };
      }
    
    } catch (error) {
      return { status: 'ERROR', message: `${error.message}` };
    }
  };

  const getAll = async () => {
    try {

      const exist = await ingredientModel.find();

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
    create,getAll
}