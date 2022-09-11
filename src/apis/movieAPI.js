import axiosClient from "./axiosClient";

const movieAPI = {
  getMovies: () => {
    return axiosClient.get("QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP01",
      },
    });
  },

  getBanners: () => {
    return axiosClient.get("QuanLyPhim/LayDanhSachBanner");
  },

  getMovieDetails: (movieId) => {
    return axiosClient.get("QuanLyPhim/LayThongTinPhim", {
      params: {
        maPhim: movieId,
      },
    });
  },

  getCinema: () => {
    return axiosClient.get("QuanLyRap/LayThongTinHeThongRap");
  },

  showCinemasList: () => {
    return axiosClient.get("QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: {
        maNhom: "GP01",
      },
    });
  },

  getChairList: (timeId) => {
    return axiosClient.get("QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        maLichChieu: timeId,
      },
    });
  },
  addMovie: (movie) => {
    // Đối với dữ liệu có định dạng đặc biệt như File,...
    // Ta cần phải tạo ra FormData để lưu trữ
    const formData = new FormData();

    // Duyệt qua từng thuộc tính trong object movie và thêm vào formData
    for (let key in movie) {
      formData.append(key, movie[key]);
    }
    // formData.append("maNhom", "GP01");
    // formData.append('tenPhim',movie.tenPhim);
    // formData.append('trailer',movie.trailer);
    // formData.append('moTa',movie.moTa);
    // formData.append('ngayKhoiChieu',movie.ngayKhoiChieu);
    // formData.append('sapChieu', `${movie.sapChieu}`);
    // formData.append('dangChieu', `${movie.dangChieu}`);
    // formData.append('hot', `${movie.hot}`);
    // formData.append('danhGia',movie.danhGia);
    // formData.append('hinhAnh',movie.hinhAnh[0].name);;
    return axiosClient.post("QuanLyPhim/ThemPhimUploadHinh", formData);
  },
  deleteMovie: (movieId, auth) => {
    return axiosClient.delete("QuanLyPhim/XoaPhim", {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      params: {
        maPhim: movieId,
      },
    });
  },
  
  
};

export default movieAPI;
