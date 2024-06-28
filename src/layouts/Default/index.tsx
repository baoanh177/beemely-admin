import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
const DefaultLayout = () => {
  return (
    <Sidebar>
      <TopBar />
      <Outlet />
    </Sidebar>
  );
};

export default DefaultLayout;
