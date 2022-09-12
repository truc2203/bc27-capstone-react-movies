import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import { VideoCameraOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
  getItem(<NavLink to="./">Quản Lý Người Dùng</NavLink>
  , "sub1", <UserOutlined />),
  getItem(<NavLink to="../">Quản Lý Phim</NavLink>, "sub2", <VideoCameraOutlined />),
  // getItem("Lịch Chiếu", "9", <FileOutlined />),
];

const UserList = () => {
  const {
    data: movies,
    isLoading,
    error,
  } = useRequest(() => movieAPI.getMovies());
  const navigate = useNavigate();
  const movePath = (path) => {
    navigate(path);
  };
  const user = JSON.parse(localStorage.getItem("user"));

  const handleEditMovie = (movie) => {
    movePath(`movies/edit/${movie.maPhim}`);
  };

  const handleDeleteMovie = (movieId, auth) => {
    movieAPI.deleteMovie(movieId, auth);
  };
  const [collapsed, setCollapsed] = useState(false);
  if (!user || user.maLoaiNguoiDung !== "QuanTri") {
    return navigate("../../");
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
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
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <h4 className="text-dark mb-3">Quản Lý Người Dùng</h4>
            <button
              onClick={() => movePath("./add")}
              className="btn-style mb-3"
              style={{ width: "160px" }}
            >
              Thêm User
            </button>
            <form>
              <div className="mb-3">
                <input
                  placeholder="Nhập tên người dùng"
                  style={{ display: "inline-block", width: "80%" }}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <button
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
            
            {/* Content */}

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

export default UserList;
