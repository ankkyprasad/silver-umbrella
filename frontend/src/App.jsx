import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";

import router from "./services/router";
import queryClient from "./services/query-client";

import { tokenStatus } from "./services/api/users";
import { userSliceActions, revokeTokenThunk } from "./store/userSlice";

const App = () => {
  const dispatch = useDispatch();

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
    }
  }, [dispatch]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex flex-col">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </>
  );
};

export default App;
