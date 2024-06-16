import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
const DefaultLayout = () => {
  return (
    <>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  );
};

export default DefaultLayout;
