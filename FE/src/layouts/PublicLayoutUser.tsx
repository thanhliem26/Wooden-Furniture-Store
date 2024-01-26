import { isUserLoggedIn } from "@/utils/index";
import { Navigate, Outlet } from "react-router-dom";
import UserLayoutHeader from "@/components/userHeaderLayout";
import UserFooterLayout from "@/components/userFooterLayout";

const PublicLayoutUser = () => {
  return (
    <>
      <UserLayoutHeader />
      <Outlet />
      <UserFooterLayout />
    </>
  );
};

export default PublicLayoutUser;
