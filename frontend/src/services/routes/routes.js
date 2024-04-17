import Home from "../../pages/users/Home";
import Login from "../../pages/users/Login";
import Register from "../../pages/users/Register";

import ShowBlog from "../../pages/blogs/Show";
import CreateBlog from "../../pages/blogs/Create";
import EditBlog from "../../pages/blogs/Edit";
import NotFound from "../../pages/NotFound";
import Unauthorized from "../../pages/Unauthorized";
import Profile from "../../pages/users/Profile";

const routes = Object.freeze({
  HOME: <Home />,
  LOGIN: <Login />,
  REGISTER: <Register />,
  SHOWBLOG: <ShowBlog />,
  CREATEBLOG: <CreateBlog />,
  EDITBLOG: <EditBlog />,
  NOTFOUND: <NotFound />,
  UNAUTHORIZED: <Unauthorized />,
  PROFILE: <Profile />,
});

export default routes;
