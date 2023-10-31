import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Outlet, Navigate } from "react-router-dom";
import { isUserLoggedIn } from "@/utils/index";
import SideBar from "@/components/sideBarComponent";
import NavbarComponent from "@/components/navbarComponent";
import { fetchUserInfo } from '@/store/user';
import { useAppDispatch } from '@/store/index';

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const dispatch = useAppDispatch()

  if (!isUserLoggedIn()) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [])

  return (
    <Layout className="layout__admin-private">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed}/>
      <NavbarComponent collapsed={collapsed} setCollapsed={setCollapsed}>
        <Outlet />
      </NavbarComponent>
    </Layout>
  );
};

export default AdminLayout;
