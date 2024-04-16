import Home from "../../pages/users/Home";
import Login from "../../pages/users/Login";
import Register from "../../pages/users/Register";

import ShowBlog from "../../pages/blogs/Show";
import CreateBlog from "../../pages/blogs/Create";
import NotFound from "../../pages/NotFound";

const routes = Object.freeze({
  HOME: <Home />,
  LOGIN: <Login />,
  REGISTER: <Register />,
  SHOWBLOG: <ShowBlog />,
  CREATEBLOG: <CreateBlog />,
  NOTFOUND: <NotFound />,
});

export default routes;
