import { createBrowserRouter } from "react-router-dom";

import Root from "../pages/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import ShowBlog from "../pages/blogs/Show";
import CreateBlog from "../pages/blogs/Create";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "blogs",
        children: [
          {
            path: ":id",
            element: <ShowBlog />,
          },
          {
            path: "create",
            element: <CreateBlog />,
          },
        ],
      },
    ],
  },
]);

export default router;
