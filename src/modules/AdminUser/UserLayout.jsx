import React, { useState } from "react";
import useRequest from "hooks/useRequest";
import userAPI from "apis/userAPI";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { VideoCameraOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCalendar,
} from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";
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
const UserLayout = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useRequest(() => userAPI.getUsers());
  const navigate = useNavigate();
  const movePath = (path) => {
    navigate(path);
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  if (!user || user.maLoaiNguoiDung !== "QuanTri") {
    return navigate("../../");
  }
  const handleDeleteUser = (userId, auth) => {
    userAPI.deleteUser(userId, auth);
  };
  const handleEditUser = (userr) => {
    movePath(`edit/${userr.taiKhoan}`);
    dispatch({ type: "userInfo", userr });
  };
  const handleFindUser = (userId) => {
    userAPI.findUser(userId);
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
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <h4 className="text-dark mb-3">Quản lý người dùng</h4>
            <button
              onClick={() => movePath("add")}
              className="btn-style mb-3"
              style={{ width: "250px" }}
            >
              Thêm người dùng
            </button>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Nhập tài khoản"
                  style={{ display: "inline-block", width: "80%" }}
                  className="form-control"
                />
                <button
                  onClick={(userId) => handleFindUser(userId.taiKhoan)}
                  type="submit"
                  className="btn-style"
                  style={{ padding: "7px 14px" }}
                >
                  Tìm kiếm
                </button>
              </div>
            </form>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Tài Khoản</th>
                  <th scope="col">Loại người dùng</th>
                  <th scope="col">Mật khẩu</th>
                  <th scope="col">Họ Tên</th>
                  <th scope="col">Email</th>
                  <th scope="col">Số Điện Thoại</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              {users?.map((userr) => {
                return (
                  <tbody key={userr.taiKhoan}>
                    <tr>
                      <td>{userr.taiKhoan}</td>
                      <td
                        style={{
                          color:
                            userr.maLoaiNguoiDung === "QuanTri"
                              ? "red"
                              : "blue",
                        }}
                      >
                        {userr.maLoaiNguoiDung}
                      </td>
                      <td>{userr.matKhau}</td>
                      <td>{userr.hoTen}</td>
                      <td>{userr.email}</td>
                      <td>{userr.soDT}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleDeleteUser(userr.taiKhoan, user.accessToken)
                          }
                          className="px-2 fs-5"
                        >
                          <AiOutlineDelete />
                        </button>
                        <button
                          onClick={() => handleEditUser(userr)}
                          className="fs-5"
                        >
                          <AiOutlineEdit />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        ></Footer>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
