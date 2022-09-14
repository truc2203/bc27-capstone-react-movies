import { Button, Form, Input, notification } from "antd";
// import authAPI from "apis/authAPI";
// import useRequest from "hooks/useRequest";
import { useForm, Controller } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../slices/authSlice";

const Login = () => {
  const {
    handleSubmit,
    // Sử dụng kết hợp với Controller thay thế cho register đối với các trường hợp component không hỗ trợ ref
    control,
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    mode: "onTouched",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  const onSubmit = async (values) => {
    try {
      // chờ cho action login thành công
      await dispatch(login(values)).unwrap();
      // Chuyển user về trang home
      navigate("/");
      notification.success({
        message: "Đăng nhập thành công",
      });
    } catch (error) {
      notification.error({
        message: "Đăng nhập thất bại",
        description: error,
      });
    }
  };
//Login thi ko can kiem tra cai nay, va vao login de login ma kiem tra login thi se sai logic
  // Đã đăng nhập
  // if (user) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div className="login">
      <h1>Login</h1>
      <Form className="form-login"
        onFinish={handleSubmit(onSubmit)}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 8 }}
      >
        <Controller
          name="taiKhoan"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Tài khoản không được để trống",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label="Tài khoản"
              validateStatus={error ? "error" : ""}
              help={error?.message}
            >
              <Input type="text" {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="matKhau"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Mật khẩu không được để trống",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label="Mật khẩu"
              validateStatus={error ? "error" : ""}
              help={error?.message}
            >
              <Input type="password" {...field} />
            </Form.Item>
          )}
        />

        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isLoading}
            loading={isLoading}
          >
           Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
