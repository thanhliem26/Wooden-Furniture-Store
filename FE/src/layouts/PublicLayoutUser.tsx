import { isUserLoggedIn } from "@/utils/index";
import { Navigate, Outlet } from "react-router-dom";
import UserLayoutHeader from "@/components/userHeaderLayout";

const PublicLayoutUser = () => {
  return (
    <>
      <UserLayoutHeader />
      <Outlet />
    </>
  );
};

export default PublicLayoutUser;
