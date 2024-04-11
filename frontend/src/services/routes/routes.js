import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

import ShowBlog from "../../pages/blogs/Show";
import CreateBlog from "../../pages/blogs/Create";

const routes = Object.freeze({
  HOME: <Home />,
  LOGIN: <Login />,
  REGISTER: <Register />,
  SHOWBLOG: <ShowBlog />,
  CREATEBLOG: <CreateBlog />,
});

export default routes;
