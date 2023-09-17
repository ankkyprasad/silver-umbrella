import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import router from "./services/router";

import { tokenStatus } from "./services/api/users";
import { userSliceActions, revokeTokenThunk } from "./store/userSlice";

const client = new QueryClient();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenStatus = async () => {
      try {
        const response = await tokenStatus();
        if (response.status === 200) {
          dispatch(userSliceActions.loginUser());
        }
      } catch (error) {
        dispatch(revokeTokenThunk());
      }
    };

    const token = localStorage.getItem("token");

    if (token) {
      checkTokenStatus();
    }
  }, []);

  return (
    <>
      <QueryClientProvider client={client}>
        <div className="min-h-screen flex flex-col">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </>
  );
};

export default App;
