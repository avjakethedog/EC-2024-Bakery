const orderModel = require('../models/order')
const orderItemService = require('./orderItemService')

const createCart = async (orderInfo) => {
    try {
        const existingOrder= await orderModel.findOne({ userid: orderInfo.userid, orderStatus: "Cart"});
        if(existingOrder){
            return {
                status: 'Error',
                message: 'Bạn đã có giỏ hàng!! không thể tạo đc nữa!',
              };
        }
        else{
            const countOrders = await orderModel.countDocuments();
            var Neworder = new orderModel({userid: orderInfo.userid, trackingNumber: countOrders + 1, shippingAddress: orderInfo.shippingAddress});
            if (Neworder.save()){
                return {
                status: 'OK',
                message: 'Tạo giỏ hàng thành công!',
                data: Neworder
              };
            }
        }
    } catch (error) {
      return { status: 'ERROR', message: `${error.message}` };
    }
  };

  const createOrder = async (orderInfo) => {
    try {
        
            const countOrders = await orderModel.countDocuments();
            orderInfo.trackingNumber = countOrders;

            var Neworder = orderModel.create(orderInfo);
            if (Neworder.save()){
                return {
                status: 'OK',
                message: 'Tạo order thành công!',
                data: Neworder
              };
            }
        }
     catch (error) {
      return { status: 'ERROR', message: `${error.message}` };
    }
  };


  const updateOrder = async (orderid, orderInfo) => {
    try {
        // Tạo đối tượng cập nhật dựa trên các trường có trong orderInfo
        const updateData = {};
        
        if (orderInfo.shippingAddress) {
          updateData.shippingAddress = orderInfo.shippingAddress;
        }
        if (orderInfo.orderStatus) {
          updateData.orderStatus = orderInfo.orderStatus;
        }
        if (orderInfo.totalAmount) {
            updateData.totalAmount = orderInfo.totalAmount;
        }
        if (orderInfo.orderDate) {
            updateData.orderDate = orderInfo.orderDate;
        }
        if (orderInfo.shippingMethod) {
            updateData.shippingMethod = orderInfo.shippingMethod;
        }
        if (orderInfo.paymentMethod) {
            updateData.paymentMethod = orderInfo.paymentMethod;
        }
        if (orderInfo.paymentStatus) {
            updateData.paymentStatus = orderInfo.paymentStatus;
        }
    
        // Kiểm tra xem có dữ liệu để cập nhật hay không
        if (Object.keys(updateData).length === 0) {
          return {
            status: 'Error',
            message: 'Không có thông tin cập nhật!',
          };
        }
        // Cập nhật thông tin đơn hàng
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderid,
          { $set: updateData },
          { new: true } // Tùy chọn này trả về tài liệu sau khi đã cập nhật
        );
    
        if (!updatedOrder) {
          return {
            status: 'Error',
            message: 'Không tìm thấy đơn hàng!',
          };
        }
    
        return {
          status: 'OK',
          message: 'Cập nhật đơn hàng thành công!',
          data: updatedOrder
        };
    
      } catch (error) {
        return { status: 'ERROR', message: `${error.message}` };
      }
  };

  const getCart = async (userid) => {
    try {
        const exist = await orderModel.findOne({ userid: userid, orderStatus: "Cart"});
        if(exist){
          const listItem = await orderItemService.getListItem(exist._id);
          if(listItem){
            return {
              status: 'OK',
              message: 'Lấy giỏ hàng thành công',
              data: listItem.data
            };
          }
            
        }
        else{
          return {
            status: 'ERROR',
            message: 'Không có giỏ hàng',
          };
        }
      } catch (error) {
        return { status: 'ERROR', message: `${error.message}` };
      }
  };

  module.exports = {
    createCart,updateOrder,getCart,createOrder
}