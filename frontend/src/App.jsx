import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";

import router from "./services/routes/router";
import queryClient from "./services/query-client";

import { tokenStatus } from "./services/api/users";
import { userSliceActions, revokeTokenThunk } from "./store/userSlice";
import LoadingSvg from "./components/shared/LoadingSvg";

const App = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const checkTokenStatus = async () => {
      try {
        const response = await tokenStatus();
        if (response.status === 200) {
          dispatch(userSliceActions.loginUser({ userData: response.data }));
        }
      } catch (error) {
        dispatch(revokeTokenThunk());
      }
    };

    const token = localStorage.getItem("token");

    if (token) {
      checkTokenStatus();
    } else {
      dispatch(revokeTokenThunk());
    }
  }, [dispatch]);

  if (userState.loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSvg />
      </div>
    );
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex flex-col">
          <RouterProvider router={router(userState.isLoggedIn)} />
        </div>
      </QueryClientProvider>
    </>
  );
};

export default App;
