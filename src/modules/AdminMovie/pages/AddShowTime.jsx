import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Breadcrumb, Layout, Menu } from "antd";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DatePicker from "react-datepicker";

import { VideoCameraOutlined, UserOutlined } from "@ant-design/icons";
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
const AddShowTime = () => {
  const { movieInfo } = useSelector((state) => state.movie);
  const [collapsed, setCollapsed] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      heThongRap: "",
      cumRap: "",
      moTa: "",
      ngayKhoiChieu: "",
      giaVe: "",
    },
    mode: "onTouched",
  });
  const navigate = useNavigate();
  const movePath = (path) => {
    navigate(path);
  };
  const [startDate, setStartDate] = useState(new Date());
  const { data: handleAddMovie } = useRequest(
    (values) => movieAPI.addMovie(values),
    { isManual: true }
  );

  const [ttName, setTheaterName] = useState("");
  const { data: theaters } = useRequest(() => movieAPI.getCinema());
  const { data: theatersName } = useRequest(() => movieAPI.getCinemas(ttName));
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
              <h5 className="text-dark mb-3">Tạo Lịch Chiếu</h5>
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
            <div>
              <img
                className="rounded-2 mb-4"
                src={movieInfo?.hinhAnh}
                alt=""
                style={{ width: "200px", height: "260px" }}
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pb-5">
                <div className="d-inline-block w-15 text-end">
                  Hệ Thống Rạp :{" "}
                </div>
                <select
                  className="ms-1 inputAddMovie w-75"
                  type="text"
                  placeholder="Hệ Thống Rạp"
                  value={ttName}
                  onChange={(e) => {
                    setTheaterName(e.target.value);
                  }}
                >
                  {theaters?.map((theater) => (
                    <option key={theater.maHeThongRap} value={theater.maHeThongRap}>
                      {theater.tenHeThongRap}
                    </option>
                  ))}
                  
                </select>
              </div>

              <div className="pb-5">
                <div className="d-inline-block w-15 text-end">Cụm Rạp : </div>
                <select
                  className="ms-1 inputAddMovie w-75"
                  type="text"
                  placeholder="Tên cụm rạp"
                >
                  {theatersName?.map((name) => {
                    return (
                      <option key={name.maCumRap} {...register("cumRap")}>
                        {name.tenCumRap}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="pb-5">
                <div className="d-inline-block w-15 text-end">
                  Ngày Giờ Chiếu :{" "}
                </div>
                <span className="d-inline-block">
                  {" "}
                  <DatePicker
                    className="ms-1 inputAddMovie w-75 "
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </span>
              </div>
              <div className="pb-5">
                <div className="d-inline-block w-15 text-end">Giá Vé : </div>
                <input
                  className="ms-1 inputAddMovie w-75"
                  type="text"
                  {...register("ngayKhoiChieu")}
                />
              </div>

              <button className="btn btn-info ms-5">Tạo Lịch Chiếu</button>
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

export default AddShowTime;
