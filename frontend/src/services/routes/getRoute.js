import { Navigate } from "react-router-dom";
import routes from "./routes";

export const getRoute = (route, isLoggedIn) => {
  switch (route) {
    case routes.LOGIN:
      return redirectIfAuthenticated(routes.LOGIN, isLoggedIn);

    case routes.REGISTER:
      return redirectIfAuthenticated(routes.REGISTER, isLoggedIn);

    case routes.HOME:
      return authRequired(routes.HOME, isLoggedIn);

    case routes.SHOWBLOG:
      return authRequired(routes.SHOWBLOG, isLoggedIn);

    case routes.CREATEBLOG:
      return authRequired(routes.CREATEBLOG, isLoggedIn);

    case routes.EDITBLOG:
      return authRequired(routes.EDITBLOG, isLoggedIn);

    default:
  }
};

const authRequired = (element, isLoggedIn) => {
  if (isLoggedIn) {
    return element;
  }

  return <Navigate to={{ pathname: "/login" }} replace />;
};

const redirectIfAuthenticated = (element, isLoggedIn) => {
  if (isLoggedIn) {
    return <Navigate to={{ pathname: "/" }} replace />;
  }

  return element;
};
