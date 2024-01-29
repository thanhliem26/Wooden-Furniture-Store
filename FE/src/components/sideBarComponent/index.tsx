import useResizeWindow from "@/hoc/useWindow";
import { Layout } from "antd";
import MenuNavbar from "./menuNavbar";

const { Sider } = Layout;

interface Props {
    collapsed: boolean,
    setCollapsed: (collapsed: any) => void;
}

const SideBar = ({collapsed, setCollapsed}: Props) => {
  const resize = useResizeWindow();

  return (
    <Sider
      //pc
      trigger={resize.width >= 1200 ? null : undefined}
      collapsible={true}
      collapsed={collapsed}
      //tablet and phone
      breakpoint={resize.width < 1200 ? "xxl" : undefined}
      collapsedWidth={resize.width < 1200 ? "0" : undefined}
      onBreakpoint={(broken) => {
        setCollapsed((collapse) => !collapse);
      }}
      onCollapse={(collapsed, type) => {
        setCollapsed((collapse) => !collapse);
      }}
    >
      <div className="logo__admin-vertical" />
      <MenuNavbar />
    </Sider>
  );
};

export default SideBar;
