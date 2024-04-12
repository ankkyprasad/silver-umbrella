import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import ErrorCard from "../shared/ErrorCard";
import LoadingSvg from "../shared/LoadingSvg";

import { loginUser } from "../../services/api/users";
import { userSliceActions } from "../../store/userSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorState, setErrorState] = useState({ header: "", message: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onError: (response) => {
      if (response.status === 400) {
        setErrorState({
          header: "Bad Request!",
          message: response.data.error_description[0],
        });
      } else if (response.status === 401) {
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

      const userData = response.data.resource_owner;
      dispatch(userSliceActions.loginUser({ userData }));
      navigate("/");
    },
  });

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    loginMutation.mutate({ email, password });
  };

  return (
    <>
      {loginMutation.isError && <ErrorCard error={errorState} />}
      <form onSubmit={loginSubmitHandler}>
        <div className="my-6">
          <Input
            placeholder="john@doe.com"
            value={email}
            setValue={setEmail}
            type="email"
            label={"Email Address"}
          />
        </div>
        <div className="my-6">
          <Input
            placeholder="••••••••••••"
            value={password}
            setValue={setPassword}
            type="password"
            label={"Password"}
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
          {loginMutation.isLoading ? <LoadingSvg /> : "Login"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
