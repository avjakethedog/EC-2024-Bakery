import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../Components/Page/Common";
import "bootstrap/dist/css/bootstrap.min.css";
import { inputHelper } from "../Helpers";
import { apiResponse } from "../Interfaces";
import { useRegisterMutation } from "../Apis/authApi";

function Register() {
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    email: "",
  });

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "address" && value.length > 0) {
      const firstChar = value.charAt(0);
      if (!/^[0-9]$/.test(firstChar)) {
        e.target.setCustomValidity("Ký tự đầu tiên của địa chỉ phải là số.");
        e.target.reportValidity();
        return;
      } else if (/[^a-zA-Z0-9\s,\./]/.test(value)) {
        e.target.setCustomValidity("Địa chỉ không được chứa ký tự đặc biệt.");
        e.target.reportValidity();
        return;
      } else {
        e.target.setCustomValidity("");
      }
    }

    if (name === "phone") {
      const phoneRegex = /^[0-9]*$/;
      const validPrefixes =
        /^(032|033|034|035|036|037|038|039|088|091|094|081|082|083|084|085|090|093|089|070|079|077|076|078|096|097|098|086|092)/;
      if (!phoneRegex.test(value)) {
        e.target.setCustomValidity("Số điện thoại chỉ được chứa các ký tự số.");
        e.target.reportValidity();
        return;
      } else if (
        value.length > 3 &&
        !validPrefixes.test(value.substring(0, 3))
      ) {
        e.target.setCustomValidity(
          "Ba số đầu tiên của số điện thoại không hợp lệ."
        );
        e.target.reportValidity();
        return;
      } else {
        e.target.setCustomValidity("");
      }
    }

    if (name === "fullName") {
      const nameRegex = /^[a-zA-Z\s]*$/;
      if (!nameRegex.test(value)) {
        e.target.setCustomValidity(
          "Tên không được chứa các ký tự số hoặc ký tự đặc biệt."
        );
        e.target.reportValidity();
        return;
      } else {
        e.target.setCustomValidity("");
      }
    }

    if (name === "userName") {
      const usernameRegex = /^[a-zA-Z0-9@$#*!%&]*$/;
      const hasDiacritics =
        /[áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/;
      if (!usernameRegex.test(value) || hasDiacritics.test(value)) {
        e.target.setCustomValidity(
          "Username không được chứa dấu hoặc ký tự đặc biệt trừ @, $, #, *, !, %, &."
        );
        e.target.reportValidity();
        return;
      } else {
        e.target.setCustomValidity("");
      }
    }

    if (name === "password") {
      const passRegex = /^[a-zA-Z0-9@$#*!%&]*$/;
      const hasDiacritics =
        /[áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/;
      if (!passRegex.test(value) || hasDiacritics.test(value)) {
        e.target.setCustomValidity(
          "Mật khẩu chỉ cho phép các ký tự không dấu và @, $, #, *, !, %, &."
        );
        e.target.reportValidity();
        return;
      } else {
        e.target.setCustomValidity("");
      }
    }

    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   const key = e.key;

  //   // Chỉ cho phép nhập các ký tự số
  //   if (!/^[0-9]$/.test(key)) {
  //     e.preventDefault();
  //   }
  // };
  const handleConfirmPasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      userInput.confirmPassword &&
      userInput.confirmPassword !== userInput.password
    ) {
      e.target.setCustomValidity("Mật khẩu xác nhận không khớp.");
      e.target.reportValidity();
    } else {
      e.target.setCustomValidity("");
    }
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (userInput.phone.length !== 10) {
      e.target.setCustomValidity("Số điện thoại phải đủ 10 số.");
      e.target.reportValidity();
    } else {
      e.target.setCustomValidity("");
    }
  };

  const handleConfirmPasswordInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (value === userInput.password) {
      e.target.setCustomValidity("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response: apiResponse = await registerUser({
        name: userInput.fullName,
        username: userInput.userName,
        password: userInput.password,
        phone: userInput.phone,
        shippingAddress: userInput.address,
        email: userInput.email,
      }).unwrap();

      // Xử lý dữ liệu trả về khi thành công
      console.log(response.data);
      alert(response.message);
      // Điều hướng tới trang khác nếu cần
      navigate("");
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Đã có lỗi xảy ra: ", error);
      alert("Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
    setLoading(false);
    const phoneRegex =
      /^(032|033|034|035|036|037|038|039|088|091|094|081|082|083|084|085|090|093|089|070|079|077|076|078|096|097|098|086|092)[0-9]{7}$/;
    if (!phoneRegex.test(userInput.phone)) {
      alert(
        "Số điện thoại phải có đúng 10 chữ số và bắt đầu bằng các mã hợp lệ."
      );
      setLoading(false);
      return;
    }
    if (userInput.password !== userInput.confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      setLoading(false);
      return;
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1523294587484-bae6cc870010?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJha2VyeXxlbnwwfHwwfHx8MA%3D%3D")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="p-5 rounded"
        style={{
          backgroundColor: "rgba(255, 255, 255, 1.0)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        {loading && <MainLoader />}
        <form method="post" onSubmit={handleSubmit}>
          <h1 className="mb-4">Sign up</h1>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/user-male-circle.png"
                  alt="Full Name Icon"
                  style={{ width: "20px" }}
                />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Full name"
              value={userInput.fullName}
              name="fullName"
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon2">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/user.png"
                  alt="Username Icon"
                  style={{ width: "20px" }}
                />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={userInput.userName}
              name="userName"
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/password.png"
                  alt="Password Icon"
                  style={{ width: "20px" }}
                />
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={userInput.password}
              name="password"
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon7">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/password.png"
                  alt="Confirm Password Icon"
                  style={{ width: "20px" }}
                />
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={userInput.confirmPassword}
              name="confirmPassword"
              onChange={(e) => {
                handleUserInput(e);
                handleConfirmPasswordInput(e);
              }}
              onBlur={handleConfirmPasswordBlur}
              disabled={!userInput.password}
              required
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon4">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/phone.png"
                  alt="Phone Icon"
                  style={{ width: "20px" }}
                />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={userInput.phone}
              name="phone"
              onChange={handleUserInput}
              onBlur={handlePhoneBlur}
              maxLength={10}
              required
              // onKeyPress={handleKeyPress}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon5">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/address.png"
                  alt="Address Icon"
                  style={{ width: "20px" }}
                />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={userInput.address}
              name="address"
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon6">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/email.png"
                  alt="Email Icon"
                  style={{ width: "20px" }}
                />
              </span>
            </div>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={userInput.email}
              name="email"
              onChange={handleUserInput}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
