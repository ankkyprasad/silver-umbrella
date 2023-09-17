import { createBrowserRouter } from "react-router-dom";

import Root from "../pages/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import ShowBlog from "../pages/blogs/Show";

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
        path: "blog",
        children: [
          {
            path: ":id",
            element: <ShowBlog />,
          },
        ],
      },
    ],
  },
]);

export default router;
