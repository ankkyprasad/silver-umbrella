import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/headers/Navbar";

const Root = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar />
      )}
      <div className="flex-1 bg-neutral-200 flex flex-col relative">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
