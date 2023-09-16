import { Outlet } from "react-router-dom";

import Navbar from "../components/headers/Navbar";

const Root = () => {
  return (
    <>
      <Navbar />
      <div className="flex-1 bg-black bg-opacity-95 flex flex-col">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
