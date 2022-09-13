import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Breadcrumb, Layout, Menu } from "antd";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import {
  FileOutlined,
  VideoCameraOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
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
  getItem(<NavLink to="/admin/users">Quản Lý Người Dùng</NavLink>
  , "sub1", <UserOutlined />),
  getItem(<NavLink to="../">Quản Lý Phim</NavLink>, "sub2", <VideoCameraOutlined />),
  // getItem("Lịch Chiếu", "9", <FileOutlined />),
];
const AddMovie = () => {
  const [imgPreview, setImgPreview] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      tenPhim: "",
      moTa: "",
      trailer: "",
      hinhAnh: "",
      danhGia: "",
      ngayKhoiChieu: "",
      dangChieu: true,
      sapChieu: true,
      hot: true,
    },
    mode: "onTouched",
  });
  const navigate = useNavigate();
  const movePath = (path) => {
    navigate(path);
  };

  const { data: handleAddMovie, isLoading } = useRequest(
    (values) => movieAPI.addMovie(values),
    { isManual: true }
  );
  const [startDate, setStartDate] = useState(new Date());

  const onSubmit = async (values) => {
    try {
      await handleAddMovie(values);
      movePath("../");
      notification.success({
        message: "Thêm phim thành công",
      });
    } catch (error) {
      // Thất bại: gọi notification hiển thị error
      notification.warning({
        message: "Thêm phim thất bại",
      });
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
              <h5 className="text-dark mb-3">Thêm Phim Mới</h5>
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
            <form onSubmit={handleSubmit(onSubmit
            )}>
              <div className="pb-5">
                <div className="d-inline-block w-15 text-end">Tên Phim : </div>
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
              <div className="pb-4">
                <div className="d-inline-block w-15 text-end">Trailer : </div>
                <input
                  className="ms-1 inputAddMovie w-75"
                  type="text"
                  placeholder="Trailer"
                  {...register("trailer")}
                />
              </div>
              <div className="pb-4">
                <div className="d-inline-block w-15 text-end">Mô Tả : </div>
                <input
                  className="ms-1 inputAddMovie w-75"
                  type="text"
                  placeholder="Mô Tả"
                  {...register("moTa")}
                />
              </div>
              <div className="pb-4">
                <div className="d-inline-block w-15 text-end">
                  Ngày Khởi Chiếu :{" "}
                </div>
                <span className="d-inline-block">
                  {" "}
                  <span className="d-inline-block">
                    {" "}
                    <DatePicker
                      className="ms-1 inputAddMovie w-75 "
                      selected={startDate}
                      onSelect={(value) => setStartDate(value)}
                      dateFormat="dd/MM/yyyy"
                      {...register("ngayKhoiChieu")}
                    />
                  </span>
                </span>
              </div>
              <div className="pb-4">
                <div className="d-inline-block w-15 text-end">
                  Đang Chiếu :{" "}
                </div>
                <div className="form-check form-switch ms-3 d-inline-block">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    {...register("dangChieu")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  ></label>
                </div>
              </div>
              <div className="pb-4">
                <div className="d-inline-block w-15 text-end">Sắp Chiếu : </div>
                <div className="form-check form-switch ms-3 d-inline-block">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    {...register("sapChieu")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  ></label>
                </div>
              </div>
              <div className="pb-4">
                <div className="d-inline-block w-15 text-end">Hot : </div>
                <div className="form-check form-switch ms-3 d-inline-block">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    {...register("hot")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  ></label>
                </div>
              </div>
              <div className="pb-4">
                <div className="d-inline-block w-15 text-end">Đánh Giá : </div>
                <input
                  className="ms-1 inputAddMovie w-75"
                  type="text"
                  placeholder="Đánh giá phim"
                  {...register("danhGia")}
                />
              </div>
              <div className="pb-4">
                {/* <input cl5ssName="inputAddMovie w-75" type="file" placeholder="Hình Ảnh" {...register("hinhAnh")} /> */}
                <div className="d-inline-block w-15 text-end">Hình Ảnh : </div>
                <input
                  className="ms-1 "
                  type="file"
                  placeholder="Hình Ảnh"
                  onChange={handleChangeImage}
                />
                {imgPreview && <img src={imgPreview} alt="preview" style={{width:'200px', height:'260px'}} />}
              </div>
              

              <button className="btn btn-info ms-5">Thêm Phim</button>
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

export default AddMovie;
