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
  getCinemas: (theaterName) => {
    return axiosClient.get("QuanLyRap/LayThongTinCumRapTheoHeThong",{
      params:{
        maHeThongRap:theaterName
      }
    });

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
    formData.append("maNhom", "GP01");
    return axiosClient.post("QuanLyPhim/ThemPhimUploadHinh", formData);
  },
  editMovie: (movieId, auth) => {
    const formData = new FormData();
    for (let key in movieId) {
      if (key === "maPhim") continue;
      formData.append(key, movieId[key]);
    }
    formData.append("maNhom", "GP01");
    formData.append("maPhim", movieId.maPhim.movieId);
    return axiosClient.post("QuanLyPhim/CapNhatPhimUpload", formData);
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
  addShowtime: (showtime) => {

    return axiosClient.post('QuanLyDatVe/TaoLichChieu',showtime)
  }
};

export default movieAPI;
