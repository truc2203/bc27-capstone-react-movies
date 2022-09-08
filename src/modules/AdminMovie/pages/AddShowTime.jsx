import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Breadcrumb, Layout, Menu } from "antd";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

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
const AddShowTime = () => {
  const [imgPreview, setImgPreview] = useState("");
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

  const handleChangeImage = (evt) => {
    // Đối với input type là file, có sẽ không dùng event.target.value mà thay thể bằng event.target.files
    const file = evt.target.files[0];

    if (!file) return;

    // Lưu file vào field hinhAnh của hook form
    setValue("hinhAnh", file);

    // Xử lý hiển thị hình ảnh ra giao diện
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file); // bất đồng bộ
    fileReader.onload = (evt) => {
      // Đọc file thành công
      // evt.target.result: string base64
      setImgPreview(evt.target.result);
    };
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
        <div className="logo" />
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pb-5">
                <div className="d-inline-block w-15 text-end">
                  Hệ Thống Rạp :{" "}
                </div>
                <input
                  className="ms-1 inputAddMovie w-75"
                  type="text"
                  placeholder="Tên Phim"
                  {...register("tenPhim")}
                />
              </div>
              {/* <div className="pb-5">
                <div className="d-inline-block w-15 text-end">Bí Danh : </div>
                <input className="ms-1 inputAddMovie w-75"
                  type="text"
                  placeholder="Bí Danh"
                  {...register("biDanh")}
                />
              </div> */}
              <div className="pb-5">
                <div className="d-inline-block w-15 text-end">Cụm Rạp : </div>
                <input
                  className="ms-1 inputAddMovie w-75"
                  type="text"
                  placeholder="Trailer"
                  {...register("trailer")}
                />
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
