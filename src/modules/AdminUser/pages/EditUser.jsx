import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Breadcrumb, Layout, Menu } from "antd";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { notification } from "antd";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import userAPI from "apis/userAPI";
import {
  FileOutlined,
  VideoCameraOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useRequest from "hooks/useRequest";
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
const EditUser = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      taiKhoan: userInfo.taiKhoan,
      matKhau: userInfo.matKhau,
      email: userInfo.email,
      soDt: userInfo.soDT,
      maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
      hoTen: userInfo.hoTen,
      maNhom: "GP01",
    },
    mode: "onTouched",
  });
  const navigate = useNavigate();
  const movePath = (path) => {
    navigate(path);
  };
  const { data: handleEditUser, isLoading } = useRequest(
    (values, user) => userAPI.updateUser(values, user.accessToken),
    { isManual: true }
  );
  const onSubmit = async (values, user) => {
    try {
      user = JSON.parse(localStorage.getItem("user"));

      await handleEditUser(values, user);
      // Thành công: gọi notification
      // Redirect về trang MovieList
      notification.success({
        message: "Cập nhật thành công",
      });
      movePath("../users");
    } catch (error) {
      notification.warning({
        message: "Cập nhật thất bại",
        description : error
      });
      // Thất bại: gọi notification hiển thị error
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
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
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <div className="d-flex justify-content-between">
              <h5 className="text-dark mb-3">Cập nhật thông tin</h5>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex">
                <div className="col-6 m-2">
                <div className="pb-5">
                  <span>Tài Khoản :</span>
                <fieldset disabled>
                <input
                  className="form-control w-75"
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
                </fieldset>
                
              </div>
              <div className="pb-5">
              <span>Mật Khẩu:</span>
                <input
                  className="form-control w-75"
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
              <span>Email :</span>
                <input
                  className="form-control w-75"
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
                </div>
                <div className="col-6 m-2">
                <div className="pb-5">
                <span>Số Điện Thoại :</span>
                <input
                  className="form-control w-75"
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
              <span>Loại Người Dùng :</span>
                <select  className="form-control w-75"
                  type="text"
                  placeholder="Loại người dùng"
                  {...register("maLoaiNguoiDung")}>
                    <option value="QuanTri">Quản Trị</option>
                    <option value="KhachHang">Khách Hàng</option>
                </select>
                 
                
              </div>
              <div className="pb-5 ">
                <span>Họ Tên</span>
                <input
                  className="form-control w-75"
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
                </div>

              </div>
              
              
              <button className="btn btn-success">Cập nhật</button>
            </form>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};

export default EditUser;
