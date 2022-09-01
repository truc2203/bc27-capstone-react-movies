import { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import './overwrite.css'
import './index.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import MainLayout from "components/MainLayout";
import AuthLayout from "components/AuthLayout";
import CheckoutRoute from "routes/CheckoutRoute";

// Không import trực tiếp các pages, vì nó sẽ được tải tất cả ở lần đầu tiên
// import Home from "modules/Home/pages/Home";
// import Movie from "modules/Movie/pages/Movie";
// import Login from "modules/Authentication/pages/Login";
// import Register from "modules/Authentication/pages/Register";

// Để chỉ cần tải những pages cần thiết ta sử dụng kĩ thuật lazyload
const Home = lazy(() => import("modules/Home/pages/Home"));
const Movie = lazy(() => import("modules/Movie/pages/Movie"));
const Login = lazy(() => import("modules/Authentication/pages/Login"));
const Register = lazy(() => import("modules/Authentication/pages/Register"));

const MovieList = lazy(() => import("modules/AdminMovie/pages/MovieList"));
const AddMovie = lazy(() => import("modules/AdminMovie/pages/AddMovie"));

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
            // <AdminRoute>
            //   <AdminLayout />
            // </AdminRoute>

            <div>
              <h1>Admin Layout</h1>
              <Outlet />
            </div>
          }
        >
          <Route path="movies" element={<MovieList />} />
          <Route path="movies/add" element={<AddMovie />} />

          {/* AdminUser, AdminShowtimes */}
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
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
