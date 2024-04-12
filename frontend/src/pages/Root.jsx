import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/headers/Navbar";

const Root = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname != "/login" && location.pathname != "/register" && (
        <Navbar />
      )}
      <div className="flex-1 bg-black bg-opacity-95 flex flex-col relative">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
