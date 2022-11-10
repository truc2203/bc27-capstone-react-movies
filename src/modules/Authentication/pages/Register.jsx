import authAPI from "apis/authAPI";
import useRequest from "hooks/useRequest";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

// data: taiKhoan, matKhau, email, hoTen, soDt

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
    },
    // Chế độ kích hoạt validation, mặc định là onSubmit
    mode: "onTouched",
  });
  const navigate = useNavigate();

  const { data: handleRegister, isLoading } = useRequest(
    (values) => authAPI.register(values),
    { isManual: true }
  );

  const onSubmit = async (values) => {
    try {
      await handleRegister(values);
      // Sau khi đăng ký thành công, ta cần chuyển user về trang login
      navigate("/login");
      notification.success({
        message: "Đăng ký thành công",
   
      });
    } catch (error) {
      // Đăng ký thất bại show error ra cho user thấy
      notification.error({
        message: "Đăng ký thất bại",
        description: error,
      });
    }
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <div className="log">
      <form
        className="form-log rounded-2"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div>
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Tài Khoản"
            {...register("taiKhoan", {
              required: {
                value: true,
                message: "Tài khoản không được để trống",
              },
              minLength: {
                value: 5,
                message: "Tài khoản phải từ 5 đến 20 ký tự",
              },
              maxLength: {
                value: 20,
                message: "Tài khoản phải từ 5 đến 20 ký tự",
              },
            })}
          />
          {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
        </div>

        <div>
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Mật Khẩu"
            {...register("matKhau", {
              required: {
                value: true,
                message: "Mật khẩu không được để trống",
              },
            })}
          />
          {errors.matKhau && <p>{errors.matKhau.message}</p>}
        </div>

        <div>
          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: { value: true, message: "Email không được để trống" },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email không đúng định dạng",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <input
            className="form-control "
            type="text"
            placeholder="Họ Tên"
            {...register("hoTen", {
              required: {
                value: true,
                message: "Họ tên không được để trống",
              },
            })}
          />
          {errors.hoTen && <p>{errors.hoTen.message}</p>}
        </div>
        <br />
        <div>
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Số Điện Thoại"
            {...register("soDt", {
              required: {
                value: true,
                message: "Số Điện Thoại không được để trống",
              },
            })}
          />
          {errors.soDt && <p>{errors.soDt.message}</p>}
        </div>
        <br />
        
        <button className="btn btn-info">Đăng Ký</button>
      </form>
     
    </div>
  );
};

export default Register;
