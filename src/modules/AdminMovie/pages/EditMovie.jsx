import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Breadcrumb, Layout, Menu } from "antd";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import {
  FileOutlined,
  VideoCameraOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

// Data thêm phim: tenPhim, biDanh, moTa, trailer, hinhAnh, ngayKhoiChieu, maNhom
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
const EditMovie = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      trailer: "",
      hinhAnh: "",
      ngayKhoiChieu: "",
    },
    mode: "onTouched",
  });
  const navigate = useNavigate();
  const movePath = (path) => {
    navigate(path);
  };
  const [startDate, setStartDate] = useState(new Date());
  const { data: handleAddMovie, isLoading } = useRequest(
    (values) => movieAPI.addMovie(values),
    { isManual: true }
  );

  const onSubmit = async (values) => {
    try {
      await handleAddMovie(values);
      // Thành công: gọi notification
      // Redirect về trang MovieList
    } catch (error) {
      // Thất bại: gọi notification hiển thị error
    }
  };

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
            <div className="d-flex justify-content-between">
              <h5 className="text-dark mb-3">Chỉnh Sửa Phim</h5>
              <button onClick={() => movePath("../")} className="btn-style">
                <BsFillArrowLeftCircleFill /> Quản Lý Phim
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
              <div className="pb-5">
                <div className="d-inline-block w-15 text-end">Tên Phim : </div>
                <input
                  className="ms-1 inputAddMovie w-75"
                  type="text"
                  placeholder="Tên Phim"
                  {...register("tenPhim")}
                />
              </div>
              <div className="pb-5">
                <div className="d-inline-block w-15 text-end">Trailer : </div>
                <input
                  className="ms-1 inputAddMovie w-75"
                  type="text"
                  placeholder="Trailer"
                  {...register("trailer")}
                />
              </div>
              <div className="pb-5">
                <div className="d-inline-block w-15 text-end">Mô Tả : </div>
                <input
                  className="ms-1 inputAddMovie w-75"
                  type="text"
                  placeholder="Mô Tả"
                  {...register("moTa")}
                />
              </div>
              <div className="pb-5">
                <div className="d-inline-block w-15 text-end">
                  Ngày Khởi Chiếu :{" "}
                </div>
                <span className="d-inline-block"> <DatePicker className="ms-1 inputAddMovie w-75 " selected={startDate} onChange={(date) => setStartDate(date)} /></span>
              </div>

              <button className="btn btn-info ms-5">Cập Nhật</button>
            </form>
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

export default EditMovie;
