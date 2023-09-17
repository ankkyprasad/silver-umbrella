import { useSelector } from "react-redux";

import Blogs from "../components/blogs/Blogs";

const Home = () => {
  const userState = useSelector((state) => state.user);

  return (
    <div className="text-white w-3/4 mx-auto my-8">
      
        <Blogs />
      
    </div>
  );
};

export default Home;
