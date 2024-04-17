import Home from "../../pages/users/Home";
import Login from "../../pages/users/Login";
import Register from "../../pages/users/Register";

import ShowBlog from "../../pages/blogs/Show";
import CreateBlog from "../../pages/blogs/Create";
import EditBlog from "../../pages/blogs/Edit";
import Error from "../../pages/fallbacks/Error";
import Profile from "../../pages/users/Profile";
import Loading from "../../pages/fallbacks/Loading";

const routes = Object.freeze({
  HOME: <Home />,
  LOGIN: <Login />,
  REGISTER: <Register />,
  SHOWBLOG: <ShowBlog />,
  CREATEBLOG: <CreateBlog />,
  EDITBLOG: <EditBlog />,
  ERROR: <Error />,

  PROFILE: <Profile />,
  LOADING: <Loading />,
});

export default routes;
