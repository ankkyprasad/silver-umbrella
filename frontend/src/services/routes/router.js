import { createBrowserRouter } from "react-router-dom";

import Root from "../../pages/Root";

import routes from "./routes";
import { getRoute } from "./getRoute";

const router = (isLoggedIn) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: routes.NOTFOUND,
      children: [
        {
          index: true,
          element: getRoute(routes.HOME, isLoggedIn),
        },
        {
          path: "login",
          element: getRoute(routes.LOGIN, isLoggedIn),
        },
        {
          path: "register",
          element: getRoute(routes.REGISTER, isLoggedIn),
        },
        {
          path: "blogs",
          children: [
            {
              path: ":id",
              element: getRoute(routes.SHOWBLOG, isLoggedIn),
            },
            {
              path: "create",
              element: getRoute(routes.CREATEBLOG, isLoggedIn),
            },
            {
              path: "edit/:id",
              element: getRoute(routes.EDITBLOG, isLoggedIn),
            },
          ],
        },
        {
          path: "not-found",
          element: routes.NOTFOUND,
        },
        {
          path: "unauthorized",
          element: routes.UNAUTHORIZED,
        },
      ],
    },
  ]);
};

export default router;
