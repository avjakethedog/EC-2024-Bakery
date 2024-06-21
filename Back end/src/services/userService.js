const UserModel = require('../models/user')

const createUser = async (UserInfo) => {
    try {
      const existingEmail = await UserModel.findOne({ email: UserInfo.email });
      if (existingEmail) {
        return { status: 'ERROR', message: 'Email đã được đăng kí' };
      }
  
      const existingUsername = await UserModel.findOne({ username: UserInfo.username });
      if (existingUsername) {
        return { status: 'ERROR', message: 'Username đã được đăng kí' };
      }
  
      const newUser = await UserModel.create({
        ...UserInfo
      });
      if(newUser){
        return {
            status: 'OK',
            message: 'Đăng kí tài khoản thành công!',
            data: newUser,a
          };
      }
    
    } catch (error) {
      return { status: 'ERROR', message: 'Lỗi khi đăng kí' };
    }
  };

  const loginUser = async (UserInfo) => {
    try {

      const existing = await UserModel.findOne({ username: UserInfo.username, password: UserInfo.password });
      if (!existing) {
        return { status: 'ERROR', message: 'Đăng nhập không thành công' };
      }
      else{
        return {
            status: 'OK',
            message: 'Đăng nhập thành công!',
            data: existing
          };
      }
    } catch (error) {
      return { status: 'ERROR', message: 'Lỗi đăng nhập' }; 
    }
  };

  const getAllUser = async () => {
    try {

      const allUser = await UserModel.find();

    return {
        status: 'OK',
        message: 'Danh sách user!!',
        data: allUser
        };
    } catch (error) {
      return { status: 'ERROR', message: 'Lỗi lấy danh sách user' }; 
    }
  };

module.exports = {
    createUser,loginUser,getAllUser
}