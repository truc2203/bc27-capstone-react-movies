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
    return axiosClient.get('QuanLyRap/LayThongTinHeThongRap')  
  },

  showCinemasList: () => {
    return axiosClient.get('QuanLyRap/LayThongTinLichChieuHeThongRap',{
      params:{
        maNhom:'GP01'
      }
    })
    
  },

  getChairList: (timeId) => {
    return axiosClient.get('QuanLyDatVe/LayDanhSachPhongVe',{
      params:{
        maLichChieu:timeId
      }
    })
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

};

export default movieAPI;
