import { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./overwrite.css";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import MainLayout from "components/MainLayout";
import AuthLayout from "components/AuthLayout";
import CheckoutRoute from "routes/CheckoutRoute";
import AdminRoute from "components/Admin/AdminRoute";
// Không import trực tiếp các pages, vì nó sẽ được tải tất cả ở lần đầu tiên
// import Home from "modules/Home/pages/Home";
// import Movie from "modules/Movie/pages/Movie";
import Login from "modules/Authentication/pages/Login";
import Register from "modules/Authentication/pages/Register";
import Booking from "modules/Booking/Page/Booking";
import AdminLayout from "modules/AdminMovie/AdminLayout";
import EditMovie from "modules/AdminMovie/pages/EditMovie";
import AddShowTime from "modules/AdminMovie/pages/AddShowTime";
import EditUser from "modules/AdminUser/pages/EditUser";
// Để chỉ cần tải những pages cần thiết ta sử dụng kĩ thuật lazyload
const Home = lazy(() => import("modules/Home/pages/Home"));
const Movie = lazy(() => import("modules/Movie/pages/Movie"));
// const Login = lazy(() => import("modules/Authentication/pages/Login"));
// const Register = lazy(() => import("modules/Authentication/pages/Register"));

const MovieList = lazy(() => import("modules/AdminMovie/pages/EditMovie"));
const AddMovie = lazy(() => import("modules/AdminMovie/pages/AddMovie"));

const AddUser = lazy(() => import("modules/AdminUser/pages/AddUser"));
const UserLayout = lazy(() => import("modules/AdminUser/UserLayout"));

function App() {
  return (
    // Suspense: hiển thị fallback UI (Loading) khi các file JS của một page đang được tải về
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route
          path="/admin"
          element={
            // TODO: chuyển vào component AdminLayout
            // TODO: tạo AdminRoute kiểm tra xem user có phải là QuanTri hay không
            <AdminRoute />

            // <AdminLayout />
            // <Outlet/>
          }
        >
          <Route index element={<AdminLayout />} />
          <Route path="movies/edit/:movieId" element={<EditMovie />} />
          <Route path="movies/add" element={<AddMovie />} />
          <Route path="movies/showtime" element={<AddShowTime />} />
          {/* AdminUser, AdminShowtimes */}
        </Route>
        <Route
          path="/admin"
          element={
            <AdminRoute />
            // <div>
            //   <h1>User Layout</h1>
            //   <Outlet />
            // </div>
          }
        >
          <Route path="users" element={<UserLayout />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/edit/:userId" element={<EditUser />} />
        </Route>

        {/* Để các routes có cùng chung 1 layout, ta sử dụng kĩ thuật nested route, route parent đi định nghĩa layout component, bên trong route parent sẽ gọi tới cái children routes */}
        <Route path="/" element={<MainLayout />}>
          {/* index: path của child route khớp 100% với path của parent route */}
          <Route index element={<Home />} />
          <Route path="movie/:movieId" element={<Movie />} />
          <Route
            path="checkout/:checkoutId"
            element={
              <CheckoutRoute>
                {/* <Checkout /> */}
                <h1>Checkout Component</h1>
              </CheckoutRoute>
            }
          />
          <Route path="booking/:timeId" element={<Booking />} />
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
