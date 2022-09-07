import React from 'react'
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "../Header";
import Footer from "components/Footer";
import AdminLayout from 'modules/AdminMovie/AdminLayout';
const AdminRoute = () => {
  return (
    <Layout>
 
      <Layout.Content>
        {/* Nơi chứa component được định nghĩa trong router */}
        {/* component Outlet sẽ là nơi render ra các children route  */}
        <Outlet />
      </Layout.Content>

    </Layout>
  )
}

export default AdminRoute