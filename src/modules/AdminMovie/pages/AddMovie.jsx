import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Data thêm phim: tenPhim, biDanh, moTa, trailer, hinhAnh, ngayKhoiChieu, maNhom

const AddMovie = () => {
  const [imgPreview, setImgPreview] = useState("");

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Add Movie</h1>
      <div>
        <input type="text" placeholder="Tên Phim" {...register("tenPhim")} />
      </div>
      <div>
        <input type="text" placeholder="Bí Danh" {...register("biDanh")} />
      </div>
      <div>
        <input type="text" placeholder="Mô Tả" {...register("moTa")} />
      </div>
      <div>
        <input type="text" placeholder="Trailer" {...register("trailer")} />
      </div>
      <div>
        {/* <input type="file" placeholder="Hình Ảnh" {...register("hinhAnh")} /> */}
        <input
          type="file"
          placeholder="Hình Ảnh"
          onChange={handleChangeImage}
        />
      </div>
      {imgPreview && <img src={imgPreview} alt="preview" />}
      <div>
        <input
          type="text"
          placeholder="Ngày Khởi Chiếu"
          {...register("ngayKhoiChieu")}
        />
      </div>
      <button>Thêm Phim</button>
    </form>
  );
};

export default AddMovie;
