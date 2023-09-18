import { Outlet } from "react-router-dom";

import Navbar from "../components/headers/Navbar";
import FlashCard from "../components/shared/FlashCard";

const Root = () => {
  return (
    <>
      <Navbar />
      <div className="flex-1 bg-black bg-opacity-95 flex flex-col relative">
        <FlashCard />
        <Outlet />
      </div>
    </>
  );
};

export default Root;
