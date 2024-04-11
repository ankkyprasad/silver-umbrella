import { createBrowserRouter } from "react-router-dom";

import Root from "../../pages/Root";

import routes from "./routes";
import { getRoute } from "./getRoute";

const router = (isLoggedIn) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      onchange: "",
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
          ],
        },
      ],
    },
  ]);
};

export default router;
