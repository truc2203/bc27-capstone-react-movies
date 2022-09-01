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
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <input
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

        <input
          type="text"
          placeholder="Mật Khẩu"
          {...register("matKhau", {
            required: true,
          })}
        />

        <div>
          <input
            type="text"
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

        <input
          type="text"
          placeholder="Họ Tên"
          {...register("hoTen", {
            required: true,
          })}
        />
        <input
          type="text"
          placeholder="Số Điện Thoại"
          {...register("soDt", {
            required: true,
          })}
        />
        <button>Đăng Ký</button>
      </form>
    </div>
  );
};

export default Register;
