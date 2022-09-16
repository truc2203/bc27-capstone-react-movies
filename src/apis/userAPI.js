import axiosClient from "./axiosClient";
const userAPI = {
  getUsers: () => {
    return axiosClient.get("QuanLyNguoiDung/LayDanhSachNguoiDung", {
      params: {
        maNhom: "GP01",
      },
    });
  },
  addUser: (user, auth) => {
    return axiosClient.post("QuanLyNguoiDung/ThemNguoiDung",user
      
    );
  },
  deleteUser: (userId, auth) => {
    return axiosClient.delete("QuanLyNguoiDung/XoaNguoiDung", {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      params: {
        TaiKhoan: userId,
      },
    });
  },
  searchUser: (string) => {
    return axiosClient.get("QuanLyNguoiDung/TimKiemNguoiDung", {
      params: {
        maNhom: "GP01",
        tuKhoa : string
      },
    });
  },
  updateUser: (userId, auth) => {
    return axiosClient.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", userId);
  },
  findUser: (e) => {
    return axiosClient.get("QuanLyNguoiDung/TimKiemNguoiDung", {
      params: {
        maNhom: "GP01",
        taiKhoan: e,
      },
    });
  },
};
export default userAPI;
