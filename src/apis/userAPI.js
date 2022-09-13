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
    return axiosClient.post("QuanLyNguoiDung/ThemNguoiDung", user);
  },
  deleteUser: (userId, auth) => {
    return axiosClient.delete("QuanLyNguoiDung/XoaNguoiDung", {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      params: {
        taiKhoan: userId,
      },
    });
  },
  updateUser: (userId, auth) => {
    return axiosClient.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      params: {
        taiKhoan: userId,
      },
    });
  },
  findUser: (userId) => {
    return axiosClient.get("QuanLyNguoiDung/TimKiemNguoiDung", {
      params: {
        maNhom: "GP01",
        taiKhoan: userId,
      },
    });
  },
};
export default userAPI;
