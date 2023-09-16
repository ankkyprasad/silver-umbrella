import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import Input from "./Input";
import ErrorCard from "../shared/ErrorCard";

import { loginUser } from "../../services/api/users";
import { userSliceActions } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorState, setErrorState] = useState({ header: "", message: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onError: (response) => {
      if (response.status == 400) {
        setErrorState({
          header: "Bad Request!",
          message: response.data.error_description[0],
        });
      } else if (response.status == 401) {
        setErrorState({
          header: "Unauthorized!",
          message: response.data.error_description[0],
        });
      } else {
        setErrorState({
          header: "Internal Server Error!",
          message: "Please sit tight. It will be fixed soon.",
        });
      }
    },
    onSuccess: (response) => {
      const token = response.data.token;
      localStorage.setItem("token", token);
      dispatch(userSliceActions.loginUser({ token }));
      navigate("/");
    },
  });

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    loginMutation.mutate({ email, password });
  };

  const loadingSvg = (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <>
      {loginMutation.isError && <ErrorCard error={errorState} />}
      <form onSubmit={loginSubmitHandler}>
        <div className="my-5">
          <Input
            placeholder="Email"
            value={email}
            setValue={setEmail}
            type="email"
          />
        </div>
        <div className="my-5">
          <Input
            placeholder="Password"
            value={password}
            setValue={setPassword}
            type="password"
          />
        </div>
        <button
          className={`inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none w-full mt-4 ${
            loginMutation.isLoading
              ? "cursor-not-allowed bg-blue-800 hover:bg-blue-800"
              : ""
          }`}
          type="submit"
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? loadingSvg : "Login"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
