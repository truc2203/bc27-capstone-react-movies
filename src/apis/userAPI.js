import axiosClient from "./axiosClient";
const userAPI = {
  addUser: (user, auth) => {
    return axiosClient.post("QuanLyNguoiDung/ThemNguoiDung", user, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });
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
    return axiosClient.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      params: {
        taiKhoan: userId,
      },
    });
  },
};
export default userAPI;
