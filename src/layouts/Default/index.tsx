import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import UpdateImage from "@/components/UploadImage";
const DefaultLayout = () => {
  return (
    <Sidebar>
      <TopBar />
      <UpdateImage />
      <Outlet />
    </Sidebar>
  );
};

export default DefaultLayout;
