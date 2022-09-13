import useRequest from "hooks/useRequest";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Breadcrumb, Layout, Menu, notification } from "antd";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FileOutlined,
  VideoCameraOutlined,
  UserOutlined,
} from "@ant-design/icons";
import userAPI from "apis/userAPI";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    <NavLink to="/admin/users">Quản Lý Người Dùng</NavLink>,
    "sub1",
    <UserOutlined />
  ),
  getItem(
    <NavLink to="../">Quản Lý Phim</NavLink>,
    "sub2",
    <VideoCameraOutlined />
  ),
  // getItem("Lịch Chiếu", "9", <FileOutlined />),
];
const AddUser = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    mode: "onTouched",
  });
  const navigate = useNavigate();
  const movePath = (path) => {
    navigate(path);
  };
  const { data: handleAddUser, isLoading } = useRequest(
    (values) => userAPI.addUser(values),
    { isManual: true }
  );
  const onSubmit = async (values) => {
    try {
      await handleAddUser(values);
      notification.success({
        message: "Thêm user thành công",
      });
      // Thành công: gọi notification
      // Redirect về trang MovieList
      // navigate("/admin/users");
    } catch (error) {
      notification.warning({
        message: "thêm user thất bại",
      });
    }
    // Thất bại: gọi notification hiển thị error

    console.log(values);
  };
  const onError = (error) => {
    console.log(error);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="admin-logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "16px 0" }}>
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <div className="d-flex justify-content-between">
              <h5 className="text-dark mb-3">Thêm người dùng mới</h5>
              <button
                onClick={() => movePath("../users")}
                className="btn-style"
              >
                <BsFillArrowLeftCircleFill /> Quản Lý người dùng
              </button>
            </div>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <form onSubmit={(handleSubmit(onSubmit), onError)}>
              <div className="pb-5">
                <input
                  className="form-control"
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
              </div>
              <div className="pb-5">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Mật khẩu"
                  {...register("matKhau", {
                    required: {
                      value: true,
                      message: "Mật khẩu không được để trống",
                    },
                  })}
                />
              </div>
              <div className="pb-5">
                <input
                  className="form-control"
                  type="text"
                  placeholder="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email không được để trống",
                    },
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Email không đúng định dạng",
                    },
                  })}
                />
              </div>
              <div className="pb-5">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Số điện thoại"
                  {...register("soDt", {
                    required: {
                      value: true,
                      message: "Số Điện Thoại không được để trống",
                    },
                  })}
                />
              </div>
              <div className="pb-5">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Loại người dùng"
                  {...register("maLoaiNguoiDung")}
                />
              </div>
              <div className="pb-5 ">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Họ tên"
                  {...register("hoTen", {
                    required: {
                      value: true,
                      message: "Họ tên không được để trống",
                    },
                  })}
                />
              </div>
              <button className="btn btn-success">Thêm user</button>
            </form>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};

export default AddUser;
