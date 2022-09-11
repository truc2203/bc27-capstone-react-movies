import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import { VideoCameraOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
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
  getItem("Người dùng", "sub1", <UserOutlined />, [getItem("Tom", "3")]),
  getItem("Quản Lý Phim", "sub2", <VideoCameraOutlined />),
  // getItem("Lịch Chiếu", "9", <FileOutlined />),
];

const AdminLayout = () => {
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
  if (user.maLoaiNguoiDung !== "QuanTri") {
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
            <h4 className="text-dark mb-3">Quản Lý Phim</h4>
            <button
              onClick={() => movePath("movies/add")}
              className="btn-style mb-3"
              style={{ width: "160px" }}
            >
              Thêm Phim
            </button>
            <form>
              <div className="mb-3">
                <input
                  placeholder="Nhập mã phim"
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
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Mã Phim</th>
                  <th scope="col">Hình Ảnh</th>
                  <th scope="col">Tên Phim</th>
                  <th scope="col">Mô Tả</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>

              {movies?.map((movie) => {
                return (
                  <tbody key={movie.maPhim}>
                    <tr>
                      <td>{movie.maPhim}</td>
                      <td>
                        <img
                          className="rounded-1"
                          src={movie.hinhAnh}
                          alt=""
                          style={{ width: "60px", height: "60px" }}
                        />
                      </td>
                      <td>{movie.tenPhim}</td>
                      <td className="w-50">{movie.moTa}</td>
                      <td>
                        <button
                          onClick={() => handleEditMovie(movie)}
                          className="fs-5"
                        >
                          <AiOutlineEdit />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteMovie(movie.maPhim, user.accessToken)
                          }
                          className="px-2 fs-5"
                        >
                          <AiOutlineDelete />
                        </button>
                        <button
                          onClick={() => movePath("movies/showtime")}
                          className="fs-5"
                        >
                          <AiOutlineCalendar />
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

export default AdminLayout;
