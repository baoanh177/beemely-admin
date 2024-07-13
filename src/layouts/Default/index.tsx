import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import TopBar from "../../components/layout/TopBar";
import Copyright from "../../components/layout/Copyright";

const DefaultLayout = () => {
  return (
    <Sidebar>
      <TopBar />
      <Outlet />
      <Copyright />
    </Sidebar>
  );
};

export default DefaultLayout;
