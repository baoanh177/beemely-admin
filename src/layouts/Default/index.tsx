import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import Heading from "./Heading";
const DefaultLayout = () => {
  return (
    <Sidebar>
      <TopBar />
      <Heading />
      <Outlet />
    </Sidebar>
  );
};

export default DefaultLayout;
